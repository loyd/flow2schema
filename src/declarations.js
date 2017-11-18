import * as t from '@babel/types';

import {declare, external, provide, enter, exit} from './commands';
import {invariant} from './utils';

type E = Generator<any, any, any>;

export default {
    entries: [
        // Blocks.
        'Program',
        'BlockStatement',
        // Imports.
        'ImportDeclaration',
        'VariableDeclarator',
        // Exports.
        'ExportNamedDeclaration',
        'ExportDefaultDeclaration',
    ],

    /*
     * Blocks.
     */

    * Program(node: t.Program): E {
        yield node.body;
    },

    * BlockStatement(node: t.BlockStatement): E {
        yield enter();
        yield node.body;
        yield exit();
    },

    /*
     * Imports.
     *
     * TODO: warning about "import typeof".
     * TODO: support form "import *".
     */

    * ImportDeclaration(node: t.ImportDeclaration): E {
        const specifiers = yield node.specifiers;
        const path = yield node.source;

        for (const specifier of specifiers) {
            specifier.path = path;

            yield external(specifier);
        }
    },

    * ImportDefaultSpecifier(node: t.ImportDefaultSpecifier): E {
        return {
            local: yield node.local,
            imported: null,
        };
    },

    * ImportSpecifier(node: t.ImportSpecifier): E {
        return {
            local: yield node.local,
            imported: yield node.imported,
        };
    },

    * VariableDeclarator(node: t.VariableDeclarator): E {
        const path = extractRequire(node.init);

        if (!path) {
            return null;
        }

        let specifiers = yield node.id;

        if (typeof specifiers === 'string') {
            specifiers = [{
                local: specifiers,
                imported: null,
            }];
        }

        for (const specifier of specifiers) {
            specifier.path = path;

            yield external(specifier);
        }
    },

    * ObjectPattern(node: t.ObjectPattern): E {
        return yield node.properties;
    },

    * ObjectProperty(node: t.ObjectProperty): E {
        const key = yield node.key;

        // TODO: different roots.
        if (node.value.type !== 'Identifier') {
            return null;
        }

        //invariant(node.value.type === 'Identifier');

        const value = yield node.value;

        return {
            local: value,
            imported: key,
        };
    },

    /*
     * Exports.
     *
     * TODO: support "export from" form.
     * TODO: support commonjs.
     */

    * ExportDefaultDeclaration(node: t.ExportDefaultDeclaration): E {
        const reference = yield node.declaration;

        if (reference) {
            yield provide(null, reference);
        }
    },

    * ExportNamedDeclaration(node: t.ExportNamedDeclaration): E {
        if (!node.declaration) {
            yield node.specifiers;
            return;
        }

        const reference = yield node.declaration;

        if (reference) {
            yield provide(reference);
        }
    },

    * ExportSpecifier(node: t.ExportSpecifier): E {
        const reference = yield node.local;
        let name = yield node.exported;

        if (name === 'default') {
            name = null;
        }

        yield provide(name, reference);
    },

    /*
     * Declarations.
     */

    * TypeAlias(node: t.TypeAlias): E {
        const name = yield node.id;
        const params = node.typeParameters && (yield node.typeParameters);

        yield declare(name, node, params);

        return name;
    },

    * InterfaceDeclaration(node: t.InterfaceDeclaration): E {
        const name = yield node.id;
        const params = node.typeParameters && (yield node.typeParameters);

        yield declare(name, node, params);

        return name;
    },

    * ClassDeclaration(node: t.ClassDeclaration): E {
        const name = yield node.id;
        const params = node.typeParameters && (yield node.typeParameters);

        // TODO: do it only for "all"-mode.
        const body = node.body;
        yield body.body.filter(n => t.isClassMethod(n));

        yield declare(name, node, params);

        return name;
    },

    * TypeParameterDeclaration(node: t.TypeParameterDeclaration): E {
        return yield node.params;
    },

    * TypeParameter(node: t.TypeParameter): E {
        return {
            name: node.name,
            default: node.default ? yield node.default : null,
        };
    },

    /*
     * Utility.
     */

    * StringLiteral(node: t.StringLiteral): E {
        return node.value;
    },

    * Identifier(node: t.Identifier): E {
        return node.name;
    },
};

function extractRequire(node) {
    // XXX: refactor it!

    // TODO: use `t.*` helpers.
    const ok = node &&
               node.type === 'CallExpression' &&
               node.callee.type === 'Identifier' &&
               node.callee.name === 'require';

    if (!ok) {
        return null;
    }

    const argument = node.arguments[0];

    // TODO: warning about dynamic imports.
    invariant(t.isStringLiteral(argument));

    return argument.value;
}
