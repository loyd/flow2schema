import * as fs from 'fs';
import * as pathlib from 'path';
import type {Node} from '@babel/types';

import traverse from './traverse';
import globals from './globals';
// $FlowFixMe
import definitionGroup from './definitions';
// $FlowFixMe
import declarationGroup from './declarations';
import Module from './module';
import Scope from './scope';
import CircularList from './list';
import {invariant, isNode} from './utils';
import type Parser from './parser';
import type {Schema} from './schema';

type Task = Generator<void, ?Schema, void>;

type Group = {
    entries: string[],

    [string]: Node => Generator<any, any, any>,
};

type InstanceParam = {
    name: string,
    value: Schema,
};

export default class Collector {
    +root: string;
    +parser: Parser;
    +schemas: Schema[];
    taskCount: number;
    _tasks: CircularList<Task>;
    _active: boolean;
    _modules: Map<string, Module>;
    _roots: Set<Node>;
    _global: Scope;
    _running: boolean;

    constructor(parser: Parser, root: string = '.') {
        this.root = root;
        this.parser = parser;
        this.schemas = [];
        this.taskCount = 0;
        this._tasks = new CircularList;
        this._active = true;
        this._modules = new Map;
        this._roots = new Set;
        this._global = Scope.global(globals);
        this._running = false;
    }

    collect(path: string, internal: boolean = false) {
        // TODO: follow symlinks.
        path = pathlib.resolve(path);

        let module = this._modules.get(path);

        if (module) {
            return;
        }

        // TODO: error wrapping.
        const code = fs.readFileSync(path, 'utf8');
        const ast = this.parser.parse(code);

        // TODO: customize it.
        const namespace = pathToNamespace(pathlib.relative('.', path));

        module = new Module(path, namespace);

        const scope = this._global.extend(module);

        this._freestyle(declarationGroup, ast.program, scope, []);

        this._modules.set(path, module);

        if (this._running) {
            return;
        }

        try {
            this._running = true;
            this._schedule();

            if (!internal) {
                const task = this._grabExports(module);
                this._spawn(task);
                this._schedule();
            }
        } finally {
            this._running = false;
        }
    }

    _freestyle(group: Group, root: Node, scope: Scope, params: InstanceParam[]) {
        const iter = traverse(root);
        let result = iter.next();

        while (!result.done) {
            const node = result.value;
            const detain = isAcceptableGroup(group, node);

            if (detain && !this._roots.has(node)) {
                const task = this._collect(group, node, scope, params);
                this._roots.add(node);
                this._spawn(task);
            }

            result = iter.next(detain);
        }
    }

    * _collect(group: Group, node: Node, scope: Scope, params: InstanceParam[]): Task {
        const extractor = group[node.type];

        if (!extractor) {
            this._freestyle(group, node, scope, []);
            return null;
        }

        const iter = extractor(node);

        let result = null;

        while (true) {
            this._active = true;

            const {done, value} = iter.next(result);

            if (done) {
                return value;
            }

            invariant(value);

            if (isNode(value)) {
                result = yield* this._collect(group, value, scope, params);
            } else if (value instanceof Array) {
                result = [];

                for (const val of value) {
                    result.push(yield* this._collect(group, val, scope, params));
                }
            } else switch (value.kind) {
                case 'declare':
                    scope.addDeclaration(value.name, value.node, value.params);

                    break;
                case 'define':
                    const {schema, declared} = value;

                    if (declared && params.length > 0) {
                        const name = schema.name;

                        schema.name = generateGenericName(name, params);

                        scope.addInstance(name, schema, params.map(p => p.value));
                    } else {
                        scope.addDefinition(schema, declared);
                    }

                    this.schemas.push(schema);

                    break;
                case 'external':
                    scope.addImport(value.external);

                    break;
                case 'provide':
                    scope.addExport(value.name, value.reference);

                    break;
                case 'query':
                    const param = params.find(p => p.name === value.name);

                    if (param) {
                        // TODO: warning about missing param.
                        result = param.value;
                    } else {
                        result = yield* this._query(scope, value.name, value.params);
                    }

                    break;
                case 'enter':
                    scope = scope.extend();

                    break;
                case 'exit':
                    invariant(scope.parent);
                    scope = scope.parent;

                    break;
                case 'namespace':
                    result = scope.namespace;

                    break;
            }
        }
    }

    * _query(scope: Scope, name: string, params: Schema[]): Task {
        let result = scope.query(name, params);

        // TODO: warning.
        invariant(result.type !== 'unknown');

        // Resulting scope is always the best choice for waiting.
        scope = result.scope;

        // It's only valid the sequence: E*[CT]?F,
        //     where E - external, C - declaration, T - template, F - definition.

        switch (result.type) {
            case 'external':
                const modulePath = scope.resolve(result.info.path);

                this.collect(modulePath, true);

                const module = this._modules.get(modulePath);

                invariant(module);

                const {imported} = result.info;

                while ((result = module.query(imported, params)).type === 'unknown') {
                    yield;
                }

                if (result.type === 'definition') {
                    return result.schema;
                }

                // TODO: reexports.
                invariant(result.type === 'declaration' || result.type === 'template');

                scope = result.scope;
                name = result.name;

                // Fallthrough.
            case 'declaration':
            case 'template':
                const tmplParams = [];

                if (result.type === 'template') {
                    for (const [i, p] of result.params.entries()) {
                        tmplParams.push({
                            name: p.name,
                            value: params[i] || p.default,
                        });
                    }
                }

                invariant(result.type === 'declaration' || result.type === 'template');

                this._freestyle(definitionGroup, result.node, scope, tmplParams);

                while ((result = scope.query(name, params)).type !== 'definition') {
                    invariant(result.type !== 'external');
                    yield;
                }

                invariant(result.type === 'definition');

                // Fallthrough.
            case 'definition':
                return result.schema;
        }
    }

    * _grabExports(module: Module): Task {
        for (const [scope, name] of module.exports()) {
            yield* this._query(scope, name, []);
        }
    }

    _spawn(task: Task) {
        this._tasks.add(task);
        ++this.taskCount;
    }

    _schedule() {
        const tasks = this._tasks;

        let marker = null;

        while (!tasks.isEmpty) {
            const task = tasks.remove();

            const {done} = task.next();

            if (done) {
                marker = null;
                continue;
            }

            tasks.add(task);

            if (this._active) {
                marker = task;
                this._active = false;
            } else if (task === marker) {
                // TODO: warning.
                return;
            }
        }
    }
}

function pathToNamespace(path: string): string {
    const pathObj = pathlib.parse(path);

    return pathlib.format({
        dir: pathObj.dir,
        name: pathObj.name,
    })
        // TODO: replace invalid chars.
        .split(pathlib.sep)
        .join('.');
}

function isAcceptableGroup(group: Group, node: Node): boolean {
    return group.entries.includes(node.type);
}

function generateGenericName(base: string, params: InstanceParam[]): string {
    let name = base + '_';

    for (const {value} of params) {
        invariant(typeof value === 'string');
        name += '_' + value;
    }

    return name;
}
