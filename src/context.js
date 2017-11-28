import wu from 'wu';
import type {Node} from '@babel/types';

import Scope from './scope';
import Collector from './collector';
import {invariant} from './utils';
import type {Type} from './types';
import type {TemplateParam, ExternalInfo} from './query';

export default class Context {
    _collector: Collector;
    _scope: Scope;
    _params: TemplateParam[];

    constructor(collector: Collector, scope: Scope, params: TemplateParam[]) {
        this._collector = collector;
        this._scope = scope;
        this._params = params;
    }

    freestyle(node: Node) {
        this._collector._freestyle(node, this._scope, this._params);
    }

    declare(name: string, node: Node, params: ?TemplateParam[]) {
        this._scope.addDeclaration(name, node, params || []);
    }

    define(name: string, type: Type, declared: boolean = true): Type {
        if (declared && this._params.length > 0) {
            const params = wu(this._params).pluck('value').toArray();

            this._scope.addInstance(name, type, params);
        } else {
            this._scope.addDefinition(name, type, declared);
        }

        this._collector.types.push(type);

        return type;
    }

    external(external: ExternalInfo) {
        this._scope.addImport(external);
    }

    provide(name: ?string, reference: string) {
        this._scope.addExport(name, reference);
    }

    query(name: string, params: ?(?Type)[]): Type {
        const param = wu(this._params).find(p => p.name === name);

        if (param) {
            // TODO: warning about missing param.
            invariant(param.value != null);

            return param.value;
        }

        return this._collector._query(this._scope, name, params || []);
    }

    enter() {
        this._scope = this._scope.extend();
    }

    exit() {
        invariant(this._scope.parent);
        this._scope = this._scope.parent;
    }
}
