'use strict';

const fs = require('fs');

const extractors = require('./extractors');
const Command = require('./commands');
const {log} = require('./utils');

class Collector {
    constructor(parser) {
        this.parser = parser;
        this.schemas = Object.create(null); // TODO: use `Map`.
    }

    collect(path) {
        const code = fs.readFileSync(path, 'utf8');
        const ast = this.parser.parse(code);

        this._visit(ast);
    }

    // Given the AST output of babylon parse, walk through in a depth-first order.
    _visit(ast) {
        let stack;
        let parent;
        let keys = [];
        let index = -1;

        do {
            ++index;

            if (stack && index === keys.length) {
                parent = stack.parent;
                keys = stack.keys;
                index = stack.index;
                stack = stack.prev;

                continue;
            }

            const node = parent ? parent[keys[index]] : ast.program;

            if (isNode(node)) {
                const {type} = node;

                if (type) {
                    if (type in extractors) {
                        this._collect(node);

                        continue;
                    }
                }

                stack = { parent, keys, index, prev: stack };
                parent = node;
                keys = Object.keys(node);
                index = -1;
            }
        } while (stack);
    }

    _collect(node) {
        const extractor = extractors[node.type];

        if (!extractor) {
            log(node);
            return null;
        }

        const iter = extractor(node);

        let result = null;

        while (true) {
            const {done, value} = iter.next(result);

            if (done) {
                return value;
            }

            if (!value) {
                result = null;
            } else if (value instanceof Command && value.name === 'provide') {
                const {schema} = value;

                this.schemas[schema.name] = schema;
            } else if (Array.isArray(value)) {
                result = value.map(val => this._collect(val));
            } else {
                result = this._collect(value);
            }
        }
    }
}

function isNode(it) {
    return it && typeof it === 'object' && (it.type || it.length);
}

module.exports = Collector;
