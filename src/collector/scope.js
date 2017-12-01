import wu from 'wu';
import type {Node} from '@babel/types';

import {invariant, last} from '../utils';
import type Module from './module';
import type {Type, TypeId} from '../types';
import type {Query, Template, TemplateParam, ExternalInfo, SpecialFn} from './query';

export default class Scope {
    +id: TypeId;
    +parent: ?Scope;
    +module: ?Module;
    _entries: Map<string, Query>;

    static global(specials: {[string]: SpecialFn}) {
        const global = new Scope(null, null);

        for (const name in specials) {
            const fn = specials[name];

            global.addSpecial(name, fn);
        }

        return global;
    }

    constructor(parent: ?Scope, module: ?Module) {
        this.id = module ? module.generateScopeId() : [];
        this.parent = parent;
        this.module = module;
        this._entries = new Map;
    }

    extend(module: ?Module = null): Scope {
        return new Scope(this, module || this.module);
    }

    addSpecial(name: string, fn: SpecialFn) {
        invariant(!this._entries.has(name));

        this._entries.set(name, {
            kind: 'special',
            call: fn,
        });
    }

    addDeclaration(name: string, node: Node, params: TemplateParam[]) {
        invariant(!this._entries.has(name));

        const entry = params.length > 0 ? {
            kind: 'template',
            name,
            params,
            instances: [],
            node,
            scope: this,
        } : {
            kind: 'declaration',
            name,
            node,
            scope: this,
        };

        this._entries.set(name, entry);
    }

    addInstance(name: string, type: Type, params: (?Type)[]) {
        const template = this._entries.get(name);

        invariant(template);
        invariant(template.kind === 'template');

        const iname = generateGenericName(params);

        type.id = this.id.concat(name, iname);

        template.instances.push({params, type});
    }

    addDefinition(name: string, type: Type, declared: boolean) {
        const decl = this._entries.get(name);

        if (declared) {
            invariant(decl);
            invariant(decl.kind === 'declaration');
        } else {
            invariant(!decl);
        }

        type.id = this.id.concat(name);

        this._entries.set(name, {
            kind: 'definition',
            type,
            scope: this,
        });
    }

    addImport(info: ExternalInfo) {
        invariant(!this._entries.has(info.local));

        this._entries.set(info.local, {
            kind: 'external',
            info,
            scope: this,
        });
    }

    addExport(name: ?string, reference: string) {
        invariant(this.module);

        this.module.addExport(name, this, reference);
    }

    resolve(path: string): string {
        invariant(this.module);

        return this.module.resolve(path);
    }

    query(name: string, params: (?Type)[]): Query {
        const entry = this._entries.get(name);

        if (entry && entry.kind === 'template') {
            const augmented = entry.params.map((p, i) => params[i] === undefined ? p.value : params[i]);
            const type = findInstance(entry, augmented);

            if (type) {
                return {
                    kind: 'definition',
                    type,
                    scope: entry.scope,
                };
            }
        }

        if (entry) {
            return entry;
        }

        if (this.parent) {
            return this.parent.query(name, params);
        }

        return {
            kind: 'unknown',
        };
    }
}

function findInstance(template: Template, queried: (?Type)[]): ?Type {
    for (const {type, params} of template.instances) {
        // TODO: compare complex structures.
        const same = params.every((p, i) => p === queried[i]);

        if (same) {
            return type;
        }
    }

    return null;
}

function generateGenericName(params: (?Type)[]): TypeId {
    return wu(params)
        .map(type => {
            invariant(type);
            return getTypeName(type);
        })
        .toArray();
}

function getTypeName(type: Type): string {
    switch (type.kind) {
        case 'reference':
            const name = last(type.to);
            invariant(name != null);

            return name;
        case 'number':
            return type.repr;
        case 'string':
        case 'boolean':
            return type.kind;
        case 'literal':
            return String(type.value);
        default:
            invariant(false);
    }
}
