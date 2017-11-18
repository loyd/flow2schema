import * as t from '@babel/types';

import {declare, define, external, provide, query, enter, exit, namespace} from './commands';
import {invariant, partition} from './utils';
import type {Schema} from './schema';

type E = Generator<any, any, any>;

export const definition = {
    entries: [
        'TypeAlias',
        'InterfaceDeclaration',
        'ClassDeclaration',
    ],

    * TypeAlias(node: t.TypeAlias): E {
        let schema = yield node.right;

        if (typeof schema === 'string') {
            schema = {type: schema};
        }

        schema.name = yield node.id;
        schema.namespace = yield namespace();

        yield define(schema);

        return schema;
    },

    * InterfaceDeclaration(node: t.InterfaceDeclaration): E {
        let schema = yield node.body;

        if (node.extends.length > 0) {
            const schemas = [];

            for (const extend of node.extends) {
                const name = yield extend;
                const schema = yield query(name);

                schemas.push(schema);
            }

            schemas.push(schema);

            schema = mergeSchemas(schemas);
        }

        schema.name = yield node.id;
        schema.namespace = yield namespace();

        yield define(schema);

        return schema;
    },

    * ClassDeclaration(node: t.ClassDeclaration): E {
        let schema = yield node.body;

        if (node.superClass) {
            const name = yield node.superClass;
            const superSchema = yield query(name);

            schema = mergeSchemas([superSchema, schema]);
        }

        schema.name = yield node.id;
        schema.namespace = yield namespace();

        yield define(schema);

        return schema;
    },

    * ClassBody(node: t.ClassBody): E {
        return {
            type: 'record',
            fields: (yield node.body).filter(Boolean),
        };
    },

    * ClassProperty(node: t.ClassProperty): E {
        if (node.static) {
            return null;
        }

        return yield* extractProperty(node, node.typeAnnotation);
    },

    * ClassMethod(node: t.ClassMethod): E {
        return null;
    },

    * ObjectTypeAnnotation(node: t.ObjectTypeAnnotation): E {
        if (node.indexers.length > 0) {
            // Allow functions, getters and setters.
            const properties = (yield node.properties).filter(Boolean);

            invariant(properties.length === 0);
            invariant(node.indexers.length === 1);

            return {
                type: 'map',
                values: yield node.indexers[0],
            };
        }

        return {
            type: 'record',
            fields: (yield node.properties).filter(Boolean),
        };
    },

    * ObjectTypeProperty(node: t.ObjectTypeProperty): E {
        return yield* extractProperty(node, node.value);
    },

    * ObjectTypeIndexer(node: t.ObjectTypeIndexer): E {
        const key = yield node.key;

        invariant(key === 'string');

        return yield node.value;
    },

    * TypeAnnotation(node: t.TypeAnnotation): E {
        return yield node.typeAnnotation;
    },

    * NumberTypeAnnotation(node: t.NumberTypeAnnotation): E {
        return 'double';
    },

    * StringTypeAnnotation(node: t.StringTypeAnnotation): E {
        return 'string';
    },

    * BooleanTypeAnnotation(node: t.BooleanTypeAnnotation): E {
        return 'boolean';
    },

    * ArrayTypeAnnotation(node: t.ArrayTypeAnnotation): E {
        return {
            type: 'array',
            items: yield node.elementType,
        };
    },

    * UnionTypeAnnotation(node: t.UnionTypeAnnotation): E {
        // TODO: flatten variants.

        let [symbols, variants] = partition(node.types, isEnumSymbol);

        symbols = symbols.map(unwrapEnumSymbol);
        variants = yield variants;

        if (symbols.length > 0) {
            const enumeration = {
                type: 'enum',
                symbols,
            };

            if (variants.length === 0) {
                return enumeration;
            }

            variants.push(enumeration);
        }

        return variants;
    },

    * IntersectionTypeAnnotation(node: t.IntersectionTypeAnnotation): E {
        const schemas = [];

        for (const type of node.types) {
            // TODO: support arbitrary types, not only references.
            const name = yield type;
            const schema = yield query(name);

            schemas.push(schema);
        }

        return mergeSchemas(schemas);
    },

    * NullableTypeAnnotation(node: t.NullableTypeAnnotation): E {
        return ['null', yield node.typeAnnotation];
    },

    * NullLiteralTypeAnnotation(node: t.NullLiteralTypeAnnotation): E {
        return 'null';
    },

    * StringLiteralTypeAnnotation(node: t.StringLiteralTypeAnnotation): E {
        return {
            type: 'enum',
            symbols: [node.value],
        };
    },

    * GenericTypeAnnotation(node: t.GenericTypeAnnotation): E {
        const name = yield node.id;
        const params = node.typeParameters && (yield node.typeParameters);

        const schema = yield query(name, params);

        if (typeof schema === 'string') {
            return schema;
        }

        if (schema.$unwrap) {
            return schema.type;
        }

        const enclosing = yield namespace();

        if (schema.namespace === enclosing) {
            return schema.name;
        }

        return makeFullname(schema);
    },

    * TypeParameterInstantiation(node: t.TypeParameterInstantiation): E {
        return yield node.params;
    },

    * FunctionTypeAnnotation(node: t.FunctionTypeAnnotation): E {
        return null;
    },

    * InterfaceExtends(node: t.InterfaceExtends): E {
        return yield node.id;
    },

    * Identifier(node: t.Identifier): E {
        return node.name;
    },

    * CommentLine(node: t.CommentLine): E {
        return extractPragma(node.value);
    },

    * CommentBlock(node: t.CommentBlock): E {
        return extractPragma(node.value);
    },
};

export const declaration = {
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

function* extractLastPragma(comments: t.Comment[]): ?string {
    const pragmas = (yield comments).filter(Boolean);

    return pragmas.length > 0 ? pragmas[pragmas.length - 1] : null;
}

function* extractProperty(prop, value) {
    let type = null;

    if (prop.leadingComments) {
        type = yield* extractLastPragma(prop.leadingComments);
    }

    if (!type) {
        type = yield value;
    }

    if (!type) {
        return null;
    }

    if (type.type === 'record') {
        type.namespace = yield namespace();
        yield define(type, false);
        type = type.name;
    }

    return {
        name: yield prop.key,
        type,
    };
}

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

function parsePragma(pragma) {
    let [type, arg] = pragma.split(/\s+/);

    if (isPrimitive(type)) {
        if (arg != null) {
            return null;
        }
    } else if (type === 'fixed') {
        arg = Number(arg);

        if (!Number.isInteger(arg)) {
            return null;
        }
    } else {
        return null;
    }

    return [type, arg];
}

function extractPragma(text) {
    const marker = '$avro ';

    const value = text.trimLeft();

    if (!value.startsWith(marker)) {
        return null;
    }

    const pragma = value.slice(marker.length).trim();

    const pair = parsePragma(pragma);

    invariant(pair);

    const [type, arg] = pair;

    if (type === 'fixed') {
        return {
            type: 'fixed',
            size: arg,
        };
    }

    return type;
}

function isEnumSymbol(node) {
    return node.type === 'StringLiteralTypeAnnotation';
}

function isPrimitive(type) {
    switch (type) {
        case 'null':
        case 'int':
        case 'long':
        case 'float':
        case 'double':
        case 'bytes':
        case 'string':
        case 'boolean':
            return true;
        default:
            return false;
    }
}

function unwrapEnumSymbol(node) {
    return node.value;
}

function makeFullname(schema) {
    invariant(schema.namespace);

    return `${schema.namespace}.${schema.name}`;
}

function mergeSchemas(schemas: Schemas): Schema {
    const map = new Map;

    // TODO: overriding?
    // TODO: anonymous?
    let name = '';

    for (const schema of schemas) {
        // TODO: enums?
        invariant(schema.type === 'record');

        for (const field of schema.fields) {
            const stored = map.get(field.name);

            if (stored) {
                // TODO: what about enums?
                // TODO: improve checking.
                invariant(stored.type === field.type);
                continue;
            }

            map.set(field.name, field);
        }

        name += '_' + schema.name;
    }

    return {
        type: 'record',
        name,
        fields: Array.from(map.values()),
    };
}
