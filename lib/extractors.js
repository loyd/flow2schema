'use strict';

const assert = require('assert');

const {provide, query, enter, exit, namespace} = require('./commands');
const {partition} = require('./utils');

const extractors = {
    * TypeAlias(node) {
        let schema = yield node.right;

        if (typeof schema === 'string') {
            schema = {type: schema};
        }

        schema.name = yield node.id;
        schema.namespace = yield namespace();

        yield provide(schema);
    },

    * InterfaceDeclaration(node) {
        const schema = yield node.body;
        schema.name = yield node.id;
        schema.namespace = yield namespace();

        yield provide(schema);
    },

    * ClassDeclaration(node) {
        const schema = yield node.body;
        schema.name = yield node.id;
        schema.namespace = yield namespace();

        yield provide(schema);
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

        let type = node.leadingComments && (yield* extractLastPragma(node.leadingComments));

        return {
            name: yield node.key,
            type: type || (yield node.typeAnnotation),
        };
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
        let type = null;

        if (node.leadingComments) {
            type = yield* extractLastPragma(node.leadingComments);
        }

        if (!type) {
            type = yield node.value;
        }

        if (!type) {
            return null;
        }

        return {
            name: yield node.key,
            type,
        };
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

        // TODO: shadowing?
        if (name === 'Buffer') {
            return 'bytes';
        }

        const schema = yield query(name);
        const enclosing = yield namespace();

        if (schema.namespace === enclosing) {
            return schema.name;
        }

        return makeFullname(schema);
    },

    * FunctionTypeAnnotation(node) {
        return null;
    },

    * BlockStatement(node) {
        yield enter();
        yield node.body;
        yield exit();
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

function* extractLastPragma(comments) {
    const pragmas = (yield comments).filter(Boolean);

    return pragmas.length > 0 ? pragmas[pragmas.length - 1] : null;
}

function parsePragma(pragma) {
    let [type, arg] = pragma.split(/\s+/);

    switch (type) {
        case 'null':
        case 'int':
        case 'long':
        case 'float':
        case 'double':
        case 'bytes':
        case 'string':
        case 'boolean':
            if (arg != null) {
                return null;
            }

            break;
        case 'fixed':
            arg = Number(arg);

            if (!Number.isInteger(arg)) {
                return null;
            }

            break;
        default:
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

    assert(pair);

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

function unwrapEnumSymbol(node) {
    return node.value;
}

function makeFullname(schema) {
    if (!schema.namespace) {
        return schema.name;
    }

    return `${schema.namespace}.${schema.name}`;
}

module.exports = extractors;
