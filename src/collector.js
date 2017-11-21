import * as fs from 'fs';
import * as pathlib from 'path';
import {isNode} from '@babel/types';
import type {Node} from '@babel/types';

import traverse from './traverse';
import globals from './globals';
import definitionGroup from './definitions';
import declarationGroup from './declarations';
import Module from './module';
import Scope from './scope';
import Context from './context';
import {invariant, get, map} from './utils';
import type Parser from './parser';
import type {Schema, Type} from './schema';

type InstanceParam = {
    name: string,
    value: ?Type,
};

const VISITOR = Object.assign({}, definitionGroup, declarationGroup);

export default class Collector {
    +root: string;
    +parser: Parser;
    +schemas: Schema[];
    _modules: Map<string, Module>;
    _global: Scope;

    constructor(parser: Parser, root: string = '.') {
        this.root = root;
        this.parser = parser;
        this.schemas = [];
        this._modules = new Map;
        this._global = Scope.global(globals);
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

        this._freestyle(ast.program, scope, []);

        this._modules.set(path, module);

        if (!internal) {
            this._grabExports(module);
        }
    }

    _freestyle(root: Node, scope: Scope, params: InstanceParam[]) {
        const ctx = new Context(this, scope, params);

        const iter = traverse(root);
        let result = iter.next();

        while (!result.done) {
            const node = result.value;
            const detain = node.type in VISITOR;

            if (detain) {
                VISITOR[node.type](ctx, node);
            }

            result = iter.next(detain);
        }
    }

    _query(scope: Scope, name: string, params: (?Type)[]): Type {
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

                result = module.query(imported, params);

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
                            value: params[i] === undefined ? p.default : params[i],
                        });
                    }
                }

                invariant(result.type === 'declaration' || result.type === 'template');

                this._freestyle(result.node, scope, tmplParams);

                result = scope.query(name, params);

                invariant(result.type === 'definition');

                // Fallthrough.
            case 'definition':
                return result.schema;
        }

        invariant(false);
    }

    _grabExports(module: Module) {
        for (const [scope, name] of module.exports()) {
            this._query(scope, name, []);
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
