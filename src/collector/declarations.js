// @flow

import wu from 'wu';

// @see flow#5376.
import type {
    Block, ClassDeclaration, ExportDefaultDeclaration, ExportNamedDeclaration, Identifier,
    ImportDeclaration, ImportDefaultSpecifier, ImportSpecifier, InterfaceDeclaration,
    Node, TypeAlias, TypeParameterDeclaration, VariableDeclaration, VariableDeclarator,
    DeclareTypeAlias, DeclareInterface, DeclareClass
} from '@babel/types';

import {
    isCallExpression, isClassDeclaration, isClassMethod, isExportDefaultDeclaration, isProgram,
    isExportNamedDeclaration, isIdentifier, isImportDeclaration, isImportNamespaceSpecifier,
    isImportSpecifier, isInterfaceDeclaration, isObjectPattern, isObjectProperty, isDeclareClass,
    isStringLiteral, isTypeAlias, isVariableDeclaration, isDeclareTypeAlias, isDeclareInterface,
    isVariableDeclarator
} from '@babel/types';

import {invariant} from '../utils';
import Context from './context';
import type {ExternalInfo, TemplateParam} from './query';

/*
 * Blocks.
 */

function processBlock(ctx: Context, node: Block) {
    const scoped = isProgram(node);

    if (!scoped) {
        ctx.enter();
    }

    for (const entry of node.body) {
        processBodyEntry(ctx, entry);
    }

    if (!scoped) {
        ctx.exit();
    }
}

function processBodyEntry(ctx: Context, node: Node) {
    if (isDeclaration(node)) {
        processDeclaration(ctx, node);
        return;
    }

    if (isImportDeclaration(node)) {
        processImportDeclaration(ctx, node);
        return;
    }

    if (isExportNamedDeclaration(node)) {
        processExportNamedDeclaration(ctx, node);
        return;
    }

    if (isExportDefaultDeclaration(node)) {
        processExportDefaultDeclaration(ctx, node);
        return;
    }

    if (isVariableDeclaration(node)) {
        processVariableDeclaration(ctx, node);
        return;
    }

    // TODO: do it only for "all"-mode.
    ctx.freestyle(node);
}

/*
 * Imports.
 *
 * TODO: warning about "import typeof".
 * TODO: support form "import *".
 * TODO: support complex patterns.
 */

function processImportDeclaration(ctx: Context, node: ImportDeclaration) {
    const path = node.source.value;

    for (const specifier of node.specifiers) {
        if (isImportNamespaceSpecifier(specifier)) {
            continue;
        }

        ctx.external(extractExternal(specifier, path));
    }
}

function extractExternal(node: ImportSpecifier | ImportDefaultSpecifier, path: string): ExternalInfo {
    return {
        local: node.local.name,
        imported: isImportSpecifier(node) ? node.imported.name : null,
        path,
    };
}

function processVariableDeclaration(ctx: Context, node: VariableDeclaration) {
    for (const declarator of node.declarations) {
        processVariableDeclarator(ctx, declarator);
    }
}

function processVariableDeclarator(ctx: Context, node: VariableDeclarator) {
    if (isRequireExpression(node.init)) {
        extractExternals(ctx, node);
    } else if (isIdentifier(node.id)) {
        extractIdentifier(ctx, node);
    }
}

function extractIdentifier(ctx: Context, node: VariableDeclarator) {
    const {id} = node;

    invariant(isIdentifier(id));

    ctx.declare(id.name, node);
}

function extractExternals(ctx: Context, node: VariableDeclarator) {
    const path = extractRequirePath(node.init);

    if (path == null) {
        return null;
    }

    const {id} = node;

    if (isIdentifier(id)) {
        const external = extractCommonjsDefaultExternal(id, path);

        ctx.external(external);
    } else if (isObjectPattern(id)) {
        const externals = extractCommonjsNamedExternals(id.properties, path);

        externals.forEach(external => ctx.external(external));
    }
}

function extractRequirePath(node: Node): ?string {
    if (
        // TODO: flow fails but should not
        isRequireExpression(node) && isStringLiteral(node.arguments[0])
    ) {
        return String(node.arguments[0].value);
    }

    return null;
}

function isRequireExpression(node: Node): boolean %checks {
    return isCallExpression(node)
        && isIdentifier(node.callee, {name: 'require'})
        && node.arguments.length > 0
        // TODO: warning about dynamic imports.
        && isStringLiteral(node.arguments[0])
}

function extractCommonjsDefaultExternal(node: Identifier, path: string): ExternalInfo {
    return {
        local: node.name,
        imported: null,
        path,
    };
}

function extractCommonjsNamedExternals<+T: Node>(nodes: T[], path: string): ExternalInfo[] {
    const pred = (n): %checks => isObjectProperty(n) && isIdentifier(n.key) && isIdentifier(n.value);

    const make = prop => ({
        local: (prop: $FlowFixMe).value.name,
        imported: (prop: $FlowFixMe).key.name,
        path,
    });

    return wu(nodes)
        .filter(pred)
        .map(make)
        .toArray();
}

/*
 * Exports.
 *
 * TODO: support "export from" form.
 * TODO: support commonjs.
 * TODO: implement ObjectPattern, ArrayPattern, RestElement for variable declaration
 */
function processExportNamedDeclaration(ctx: Context, node: ExportNamedDeclaration) {
    if (isDeclaration(node.declaration)) {
        const reference = processDeclaration(ctx, node.declaration);

        ctx.provide(reference, reference);
    } else if (isVariableDeclaration(node.declaration)) {
        const {declaration} = node;
        processVariableDeclaration(ctx, declaration);
        const {declarations} = declaration;

        if (Array.isArray(declarations)) {
            for (const declarator of declarations) {
                const {id} = declarator;

                if (!isVariableDeclarator(declarator) || !isIdentifier(id)) {
                    continue;
                }

                ctx.provide(id.name, id.name);
            }
        }
    }

    for (const specifier of node.specifiers) {
        const reference = specifier.local.name;
        const exported = specifier.exported.name;
        const name = exported === 'default' ? null : exported;

        ctx.provide(name, reference);
    }
}

function processExportDefaultDeclaration(ctx: Context, node: ExportDefaultDeclaration) {
    if (!isDeclaration(node.declaration)) {
        return;
    }

    const reference = processDeclaration(ctx, node.declaration);

    ctx.provide(null, reference);
}

/*
 * Declarations.
 *
 * TODO: support defaults in generics.
 * TODO: support "declare ..." form.
 */

type Declaration = TypeAlias | InterfaceDeclaration | ClassDeclaration
                 | DeclareTypeAlias | DeclareInterface | DeclareClass;

function isDeclaration(node: mixed): boolean %checks {
    return isTypeAlias(node) || isInterfaceDeclaration(node) || isClassDeclaration(node)
        || isDeclareTypeAlias(node) || isDeclareInterface(node) || isDeclareClass(node);
}

function processDeclaration(ctx: Context, node: Declaration) {
    const {name} = node.id;
    const params = node.typeParameters && extractTemplateParams(node.typeParameters);

    // TODO: do it only for "all"-mode.
    if (isClassDeclaration(node)) {
        const methods = wu(node.body.body).filter(isClassMethod).toArray();

        for (const method of methods) {
            ctx.freestyle(method);
        }
    }

    ctx.declare(name, node, params);

    return name;
}

function extractTemplateParams(node: TypeParameterDeclaration): TemplateParam[] {
    return wu(node.params)
        .map(param => ({
            name: param.name,
            // TODO: default params.
            value: null,
        }))
        .toArray();
}

export default {
    Program: processBlock,
    BlockStatement: processBlock,
};
