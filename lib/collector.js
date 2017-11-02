'use strict';

const assert = require('assert');
const fs = require('fs');
const pathlib = require('path');

const extractors = require('./extractors');
const Command = require('./commands');
const Scope = require('./scope');
const {consume, log} = require('./utils');

class Collector {
    constructor(parser) {
        this.parser = parser;
        this.schemas = [];
        this.waiters = Object.create(null);
    }

    collect(path) {
        const code = fs.readFileSync(path, 'utf8');
        const ast = this.parser.parse(code);

        const global = Scope.global([]);

        // TODO: customize it.
        const namespace = pathToNamespace(path);

        const scope = global.extend(namespace);

        this._spawn(ast.program, scope);
    }

    // Given the AST output of babylon parse, walk through in a depth-first order.
    _spawn(root, scope) {
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
                    const task = this._collect(node, scope);

                    this._schedule(task);

                    continue;
                }

                stack = { parent, keys, index, prev: stack };
                parent = node;
                keys = Object.keys(node);
                index = -1;
            }
        } while (stack);
    }

    * _collect(node, scope) {
        const extractor = extractors[node.type];

        if (!extractor) {
            this._spawn(node, scope);
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
                    case 'spawn':
                        this._spawn(value.data, scope);

                        break;
                    case 'provide':
                        const schema = value.data;

                        scope.addSchema(schema);
                        this.schemas.push(schema);
                        this._wakeup(schema.name);

                        break;
                    case 'query':
                        let info;

                        while (!(info = scope.query(value.data))) {
                            yield value.data;
                        }

                        // TODO: support externals.
                        assert(info.type, 'local');
                        result = info.schema;

                        break;
                    case 'enter':
                        scope = scope.extend();

                        break;
                    case 'exit':
                        assert(scope.parent);
                        scope = scope.parent;

                        break;
                    case 'namespace':
                        result = scope.namespace;

                        break;
                    default:
                        assert(false);
                }
            } else if (Array.isArray(value)) {
                result = [];

                for (const val of value) {
                    result.push(yield* this._collect(val, scope));
                }
            } else {
                assert(isNode(value));
                result = yield* this._collect(value, scope);
            }
        }
    }

    _schedule(task) {
        const {done, value} = task.next();

        if (done) {
            return;
        }

        const waiters = this.waiters[value] = this.waiters[value] || [];

        waiters.push(task);
    }

    _wakeup(name) {
        if (!this.waiters[name]) {
            return;
        }

        const tasks = this.waiters[name];
        delete this.waiters[name];

        for (const task of tasks) {
            this._schedule(task);
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
