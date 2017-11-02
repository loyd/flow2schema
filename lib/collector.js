'use strict';

const assert = require('assert');
const fs = require('fs');

const extractors = require('./extractors');
const Command = require('./commands');
const Scope = require('./scope');
const {log} = require('./utils');

class Collector {
    constructor(parser) {
        this.parser = parser;
        this.schemas = Object.create(null); // TODO: use `Map`.
        this.scope = null;
    }

    collect(path) {
        const code = fs.readFileSync(path, 'utf8');
        const ast = this.parser.parse(code);

        this.scope = new Scope(null);

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

                if (type && type in extractors) {
                    this._collect(node);

                    continue;
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
            } else if (value instanceof Command) {
                switch (value.name) {
                    case 'provide':
                        assert(this.scope);
                        this.scope.addSchema(value.data);
                        this.schemas[value.data.name] = value.data;
                        break;
                    case 'query':
                        const schema = this.scope.query(value.data);
                        assert(schema, value.data);
                        result = schema;
                        break;
                    case 'enter':
                        this.scope = new Scope(this.scope);
                        break;
                    case 'exit':
                        assert(this.scope);
                        this.scope = this.scope.parent;
                        break;
                    default:
                        assert(false);
                }
            } else if (Array.isArray(value)) {
                result = value.map(val => this._collect(val));
            } else {
                assert(isNode(value));
                result = this._collect(value);
            }
        }
    }
}

function isNode(it) {
    return it && typeof it === 'object' && (it.type || it.length);
}

module.exports = Collector;
