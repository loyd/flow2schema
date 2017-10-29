'use strict';

const assert = require('assert');

const {partition, log} = require('./utils');

function extract(node) {
    if (!handlers[node.type]) {
        log(node);
        return null;
    }

    return handlers[node.type](node);
}

const handlers = {
    TypeAlias(node) {
        return extract(node.right);
    },

    InterfaceDeclaration(node) {
        return extract(node.body);
    },

    ClassDeclaration(node) {
        return extract(node.body);
    },

    ClassBody(node) {
        return {
            type: 'report',
            fields: node.body.map(extract).filter(Boolean),
        };
    },

    ClassProperty(node) {
        if (node.static) {
            return null;
        }

        let type = node.leadingComments && getLastPragma(node.leadingComments);

        return {
            name: extract(node.key),
            type: type || extract(node.typeAnnotation),
        };
    },

    ClassMethod(node) {
        return null;
    },

    ObjectTypeAnnotation(node) {
        if (node.indexers.length > 0) {
            // Allow functions, getters and setters.
            const properties = node.properties.map(extract).filter(Boolean);

            assert.equal(properties.length, 0);
            assert.equal(node.indexers.length, 1);

            return {
                type: 'map',
                values: extract(node.indexers[0]),
            };
        }

        return {
            type: 'record',
            fields: node.properties.map(extract).filter(Boolean),
        };
    },

    ObjectTypeProperty(node) {
        let type = null;

        if (node.leadingComments) {
            type = getLastPragma(node.leadingComments);
        }

        if (!type) {
            type = extract(node.value);
        }

        if (!type) {
            return null;
        }

        return {
            name: extract(node.key),
            type,
        };
    },

    ObjectTypeIndexer(node) {
        const key = extract(node.key);

        assert.equal(key, 'string');

        return extract(node.value);
    },

    TypeAnnotation(node) {
        return extract(node.typeAnnotation);
    },

    NumberTypeAnnotation(node) {
        return 'double';
    },

    StringTypeAnnotation(node) {
        return 'string';
    },

    BooleanTypeAnnotation(node) {
        return 'boolean';
    },

    ArrayTypeAnnotation(node) {
        return {
            type: 'array',
            items: extract(node.elementType),
        };
    },

    UnionTypeAnnotation(node) {
        // TODO: flatten variants.

        let [symbols, variants] = partition(node.types, isEnumSymbol);

        symbols = symbols.map(unwrapEnumSymbol);
        variants = variants.map(extract);

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

    NullableTypeAnnotation(node) {
        return ['null', extract(node.typeAnnotation)];
    },

    NullLiteralTypeAnnotation(node) {
        return {
            type: 'null',
        };
    },

    StringLiteralTypeAnnotation(node) {
        return {
            type: 'enum',
            symbols: [node.value],
        };
    },

    GenericTypeAnnotation(node) {
        return extract(node.id);
    },

    FunctionTypeAnnotation(node) {
        return null;
    },

    Identifier(node) {
        return node.name;
    },

    CommentLine(node) {
        const marker = '$avro ';

        const value = node.value.trimLeft();

        if (value.startsWith(marker)) {
            const pragma = value.slice(marker.length).trim();

            assert(isValidPragma(pragma));

            return pragma;
        }

        return null;
    },
};

function isValidPragma(pragma) {
    // TODO: support mixed.

    switch (pragma) {
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

function getLastPragma(comments) {
    const pragmas = comments
        .map(extract)
        .filter(Boolean);

    return pragmas.length > 0 ? pragmas[pragmas.length - 1] : null;
}

function isEnumSymbol(node) {
    return node.type === 'StringLiteralTypeAnnotation';
}

function unwrapEnumSymbol(node) {
    return node.value;
}

module.exports = extract;
