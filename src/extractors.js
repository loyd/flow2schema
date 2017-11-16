import * as assert from 'assert';

import {declare, define, external, provide, query, enter, exit, namespace} from './commands';
import {partition, isNode} from './utils';

export const definition = {
    entries: [
        'TypeAlias',
        'InterfaceDeclaration',
        'ClassDeclaration',
    ],

    * TypeAlias(node) {
        let schema = yield node.right;

        if (typeof schema === 'string') {
            schema = {type: schema};
        }

        schema.name = yield node.id;
        schema.namespace = yield namespace();

        yield define(schema);

        return schema;
    },

    * InterfaceDeclaration(node) {
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

    * ClassDeclaration(node) {
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

    * ClassBody(node) {
        return {
            type: 'record',
            fields: (yield node.body).filter(Boolean),
        };
    },

    * ClassProperty(node) {
        if (node.static) {
            return null;
        }

        return yield* extractProperty(node, node.typeAnnotation);
    },

    * ClassMethod(node) {
        return null;
    },

    * ObjectTypeAnnotation(node) {
        if (node.indexers.length > 0) {
            // Allow functions, getters and setters.
            const properties = (yield node.properties).filter(Boolean);

            assert.equal(properties.length, 0);
            assert.equal(node.indexers.length, 1);

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

    * ObjectTypeProperty(node) {
        return yield* extractProperty(node, node.value);
    },

    * ObjectTypeIndexer(node) {
        const key = yield node.key;

        assert.equal(key, 'string');

        return yield node.value;
    },

    * TypeAnnotation(node) {
        return yield node.typeAnnotation;
    },

    * NumberTypeAnnotation(node) {
        return 'double';
    },

    * StringTypeAnnotation(node) {
        return 'string';
    },

    * BooleanTypeAnnotation(node) {
        return 'boolean';
    },

    * ArrayTypeAnnotation(node) {
        return {
            type: 'array',
            items: yield node.elementType,
        };
    },

    * UnionTypeAnnotation(node) {
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

    * IntersectionTypeAnnotation(node) {
        const schemas = [];

        for (const type of node.types) {
            const name = yield type;
            const schema = yield query(name);

            schemas.push(schema);
        }

        return mergeSchemas(schemas);
    },

    * NullableTypeAnnotation(node) {
        return ['null', yield node.typeAnnotation];
    },

    * NullLiteralTypeAnnotation(node) {
        return 'null';
    },

    * StringLiteralTypeAnnotation(node) {
        return {
            type: 'enum',
            symbols: [node.value],
        };
    },

    * GenericTypeAnnotation(node) {
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

    * TypeParameterInstantiation(node) {
        return yield node.params;
    },

    * FunctionTypeAnnotation(node) {
        return null;
    },

    * InterfaceExtends(node) {
        return yield node.id;
    },

    * Identifier(node) {
        return node.name;
    },

    * CommentLine(node) {
        return extractPragma(node.value);
    },

    * CommentBlock(node) {
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

    * Program(node) {
        yield node.body;
    },

    * BlockStatement(node) {
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

    * ImportDeclaration(node) {
        const specifiers = yield node.specifiers;
        const path = yield node.source;

        for (const specifier of specifiers) {
            specifier.path = path;

            yield external(specifier);
        }
    },

    * ImportDefaultSpecifier(node) {
        return {
            local: yield node.local,
            imported: null,
        };
    },

    * ImportSpecifier(node) {
        return {
            local: yield node.local,
            imported: yield node.imported,
        };
    },

    * VariableDeclarator(node) {
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

    * ObjectPattern(node) {
        return yield node.properties;
    },

    * ObjectProperty(node) {
        const key = yield node.key;

        // TODO: different roots.
        if (node.value.type !== 'Identifier') {
            return null;
        }

        //assert.equal(node.value.type, 'Identifier');

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

    * ExportDefaultDeclaration(node) {
        const reference = yield node.declaration;

        if (reference) {
            yield provide(null, reference);
        }
    },

    * ExportNamedDeclaration(node) {
        if (!node.declaration) {
            yield node.specifiers;
            return;
        }

        const reference = yield node.declaration;

        if (reference) {
            yield provide(reference);
        }
    },

    * ExportSpecifier(node) {
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

    * TypeAlias(node) {
        const name = yield node.id;
        const params = node.typeParameters && (yield node.typeParameters);

        yield declare(name, node, params);

        return name;
    },

    * InterfaceDeclaration(node) {
        const name = yield node.id;
        const params = node.typeParameters && (yield node.typeParameters);

        yield declare(name, node, params);

        return name;
    },

    * ClassDeclaration(node) {
        const name = yield node.id;
        const params = node.typeParameters && (yield node.typeParameters);

        // TODO: do it only for "all"-mode.
        const body = node.body;
        yield body.body.filter(is('ClassMethod'));

        yield declare(name, node, params);

        return name;
    },

    * TypeParameterDeclaration(node) {
        return yield node.params;
    },

    * TypeParameter(node) {
        return {
            name: node.name,
            default: node.default ? yield node.default : null,
        };
    },

    /*
     * Utility.
     */

    * StringLiteral(node) {
        return node.value;
    },

    * Identifier(node) {
        return node.name;
    },
};

function* extractLastPragma(comments) {
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

    const ok = node &&
               node.type === 'CallExpression' &&
               node.callee.type === 'Identifier' &&
               node.callee.name === 'require';

    if (!ok) {
        return null;
    }

    const argument = node.arguments[0];

    // TODO: warning about dynamic imports.
    assert.equal(argument.type, 'StringLiteral');

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

    assert.ok(pair);

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
    assert.ok(schema.namespace);

    return `${schema.namespace}.${schema.name}`;
}

function mergeSchemas(schemas) {
    const map = new Map;

    // TODO: overriding?
    // TODO: anonymous?
    let name = '';

    for (const schema of schemas) {
        // TODO: enums?
        assert.equal(schema.type, 'record');

        for (const field of schema.fields) {
            const stored = map.get(field.name);

            if (stored) {
                // TODO: what about enums?
                // TODO: improve checking.
                assert.equal(stored.type, field.type);
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

function is(type) {
    return node => Boolean(node) && node.type === type;
}
