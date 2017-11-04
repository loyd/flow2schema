'use strict';

const assert = require('assert');
const fs = require('fs');
const pathlib = require('path');

const extractors = require('./extractors');
const Command = require('./commands');
const {Scope, Module} = require('./scope');
const {consume, log} = require('./utils');

class Collector {
    constructor(parser, root = '.') {
        this.root = root;
        this.parser = parser;
        this.schemas = [];
        this.tasks = [];
        this.modules = new Map;
        this.global = Scope.global([]);
        this.running = false;
    }

    collect(path) {
        // TODO: follow symlinks.
        path = pathlib.resolve(path);

        let module = this.modules.get(path);

        if (module) {
            return;
        }

        // TODO: error wrapping.
        const code = fs.readFileSync(path, 'utf8');
        const ast = this.parser.parse(code);

        // TODO: customize it.
        const namespace = pathToNamespace(pathlib.relative('.', path));

        module = new Module(path, namespace);

        const scope = this.global.extend(module);

        this._spawn(ast.program, scope);

        this.modules.set(path, module);

        if (!this.running) {
            try {
                this.running = true;
                this._schedule();
            } finally {
                this.running = false;
            }
        }
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

                    this.tasks.push(task);

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
                    case 'define':
                        scope.addSchema(value.data);
                        this.schemas.push(value.data);

                        break;
                    case 'external':
                        scope.addImport(value.data);

                        break;
                    case 'provide':
                        scope.addExport(value.data);

                        break;
                    case 'query':
                        result = yield* this._query(scope, value.data);

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

    * _query(scope, name) {
        let result;

        // Wait any information about the reference.
        while ((result = scope.query(name)).type === 'unknown') {
            yield;
        }

        if (result.type === 'local') {
            return result.schema;
        }

        assert.equal(result.type, 'external');

        // TODO: reexports.

        const modulePath = scope.resolve(result.info.path);

        this.collect(modulePath);

        const module = this.modules.get(modulePath);
        const {imported} = result.info;
        let schema;

        while (!(schema = module.query(imported))) {
            yield;
        }

        return schema;
    }

    _schedule() {
        // TODO: prevent infinite loop.

        const {tasks} = this;

        for (let i = 0; tasks.length > 0; i = ++i % tasks.length) {
            const {done} = tasks[i].next();

            if (done) {
                // TODO: use linked list instead.
                tasks.splice(i, 1);
                --i;
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
        .replace(/\//g, '.');
}

module.exports = Collector;
