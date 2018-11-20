// @flow

import * as fs from 'fs';
import * as pathlib from 'path';
import {isNode} from '@babel/types';
import type {Node} from '@babel/types';

import traverse from './traverse';
import globals from './globals';
import definitionGroup from './definitions';
import declarationGroup from './declarations';
import Fund from '../fund';
import Module from './module';
import Scope from './scope';
import Context from './context';
import {invariant} from '../utils';
import type Parser from '../parser';
import type {Type, TypeId} from '../types';
import type {Options} from '../options';
import type {TemplateParam} from './query';

const VISITOR = Object.assign({}, definitionGroup, declarationGroup);

export default class Collector {
    +parser: Parser;
    +options: Options;
    _fund: Fund;
    _modules: Map<string, Module>;
    _global: Scope;

    constructor(parser: Parser, options?: Options = {}) {
        this.parser = parser;
        this.options = options;
        this._fund = new Fund;
        this._modules = new Map;
        this._global = Scope.global(globals);
    }

    collect(path: string, internal: boolean = false) {
        // TODO: follow symlinks.
        let module = this._modules.get(path);

        if (module) {
            return;
        }

        const lib = this.options.lib;
        const libPath: string = lib && lib[path] || path;

        // TODO: error wrapping.
        const code = fs.readFileSync(libPath, 'utf8');
        const ast = this.parser.parse(code);

        // TODO: customize it.
        // XXX: replace with normal resolver and path-to-id converter.
        const id = pathToId(path.replace(/source\.js$/, ''));

        module = new Module(id, path);

        const scope = this._global.extend(module);

        this._freestyle(ast.program, scope, []);

        this._modules.set(path, module);

        if (!internal) {
            this._grabExports(module);
        }
    }

    finish(): Fund {
        return this._fund;
    }

    _freestyle(root: Node, scope: Scope, params: TemplateParam[]) {
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

    _query(scope: Scope, name: string, params: (?Type)[]): ?Type {
        let result = scope.query(name, params);

        // TODO: warning.
        invariant(result.kind !== 'unknown');

        if (result.kind !== 'special') {
            // Resulting scope is always the best choice for waiting.
            scope = result.scope;
        }

        // It's only valid the sequence: E*[CT]?F,
        //     where E - external, C - declaration, T - template, F - definition.

        switch (result.kind) {
            case 'external':
                const modulePath = scope.resolve(result.info.path, this.options.sourceModuleExtensions);

                this.collect(modulePath, true);

                const module = this._modules.get(modulePath);

                invariant(module);

                const {imported} = result.info;

                result = module.query(imported, params);

                if (result.kind === 'definition') {
                    return result.type;
                }

                // TODO: reexports.
                invariant(result.kind === 'declaration' || result.kind === 'template');

                scope = result.scope;
                name = result.name;

                // Fallthrough.
            case 'declaration':
            case 'template':
                const tmplParams = [];

                if (result.kind === 'template') {
                    for (const [i, p] of result.params.entries()) {
                        tmplParams.push({
                            name: p.name,
                            value: params[i] === undefined ? p.value : params[i],
                        });
                    }
                }

                invariant(result.kind === 'declaration' || result.kind === 'template');

                this._freestyle(result.node, scope, tmplParams);

                result = scope.query(name, params);

                invariant(result.kind === 'definition');

                // Fallthrough.
            case 'definition':
                return result.type;

            case 'special':
            default:
                const resolve = id => this._fund.take(id);
                return result.call(params, resolve);
        }
    }

    _grabExports(module: Module) {
        for (const [scope, name] of module.exports()) {
            const type = this._query(scope, name, []);

            if (type) {
                this._fund.put(type, true);
            }
        }
    }
}

function pathToId(path: string): TypeId {
    const relPath = pathlib.relative('.', path);
    const pathObj = pathlib.parse(relPath);

    return pathlib.format({
        dir: pathObj.dir,
        name: pathObj.name,
    })
        // TODO: replace invalid chars.
        .split(pathlib.sep);
}
