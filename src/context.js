import type {Node} from '@babel/types';

import Scope from './scope';
import Collector from './collector';
import {invariant, get, map} from './utils';
import type {Schema, Type, ComplexType} from './schema';
import type {TemplateParam, ExternalInfo} from './query';

type InstanceParam = {
    name: string,
    value: ?Type,
};

export default class Context {
    _collector: Collector;
    _scope: Scope;
    _params: InstanceParam[];

    constructor(collector: Collector, scope: Scope, params: InstanceParam[]) {
        this._collector = collector;
        this._scope = scope;
        this._params = params;
    }

    get namespace(): string {
        return this._scope.namespace;
    }

    freestyle(node: Node) {
        this._collector._freestyle(node, this._scope, this._params);
    }

    declare(name: string, node: Node, params: ?TemplateParam[]) {
        this._scope.addDeclaration(name, node, params || []);
    }

    define(name: string, type: ComplexType, declared: boolean = true): Schema {
        // TODO: dirty support for intersections.
        const _name = type.name != null ? type.name : name;

        const schema: $FlowFixMe = Object.assign({}, type, {
            name,
            namespace: this._scope.namespace,
        });

        if (declared && this._params.length > 0) {
            schema.name = generateGenericName(name, this._params);

            this._scope.addInstance(name, schema, map(this._params, get('value')));
        } else {
            this._scope.addDefinition(schema, declared);
        }

        this._collector.schemas.push(schema);

        return schema;
    }

    external(external: ExternalInfo) {
        this._scope.addImport(external);
    }

    provide(name: ?string, reference: string) {
        this._scope.addExport(name, reference);
    }

    query(name: string, params: ?(?Type)[]): Type {
        const param = this._params.find(p => p.name === name);

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

function generateGenericName(base: string, params: InstanceParam[]): string {
    let name = base + '_';

    for (const {value} of params) {
        invariant(typeof value === 'string');
        name += '_' + value;
    }

    return name;
}
