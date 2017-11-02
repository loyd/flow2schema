'use strict';

const assert = require('assert');
const fs = require('fs');
const pathlib = require('path');

const extractors = require('./extractors');
const Command = require('./commands');
const Scope = require('./scope');
const {log} = require('./utils');

class Collector {
    constructor(parser) {
        this.parser = parser;
        this.schemas = [];
        this.scope = null;
    }

    collect(path) {
        const code = fs.readFileSync(path, 'utf8');
        const ast = this.parser.parse(code);

        const global = Scope.global([]);

        // TODO: customize it.
        const namespace = pathToNamespace(path);

        this.scope = global.extend(namespace);

        this._visit(ast.program);
    }

    // Given the AST output of babylon parse, walk through in a depth-first order.
    _visit(root) {
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

            const node = parent ? parent[keys[index]] : root;

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
            this._visit(node);
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
                        this.schemas.push(value.data);
                        break;
                    case 'query':
                        const info = this.scope.query(value.data);
                        // TODO: support externals.
                        assert(info.type, 'local');
                        result = info.schema;
                        break;
                    case 'enter':
                        this.scope = this.scope.extend();
                        break;
                    case 'exit':
                        assert(this.scope);
                        this.scope = this.scope.parent;
                        break;
                    case 'namespace':
                        result = this.scope.namespace;
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

function pathToNamespace(path) {
    const pathObj = pathlib.parse(path);

    return pathlib.format({
        dir: pathObj.dir,
        name: pathObj.name,
    })
        // TODO: replace invalid chars.
        .replace('/', '.');
}

module.exports = Collector;
