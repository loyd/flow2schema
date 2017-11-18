import type {Node} from '@babel/types';

import {invariant} from './utils';
import type Module from './module';
import type {Schema} from './schema';
import type {Query, Template, TemplateParam, ExternalInfo} from './query';

export default class Scope {
    +parent: ?Scope;
    +module: ?Module;
    +scopeId: ?number;
    _entries: Map<string, Query>;

    static global(schemas: Schema[]) {
        const global = new Scope(null, null);

        for (const schema of schemas) {
            global.addDefinition(schema, false);
        }

        return global;
    }

    constructor(parent: ?Scope, module: ?Module) {
        this.parent = parent;
        this.module = module;
        this.scopeId = module && module.generateScopeId();
        this._entries = new Map;
    }

    get namespace(): string {
        invariant(this.module);

        let namespace = this.module.namespace;

        // Nested scopes.
        if (this.scopeId != null && this.scopeId > 0) {
            namespace += '._' + this.scopeId;
        }

        return namespace;
    }

    extend(module: ?Module = null): Scope {
        return new Scope(this, module || this.module);
    }

    addDeclaration(name: string, node: Node, params: TemplateParam[]) {
        invariant(!this._entries.has(name));

        const entry = params.length > 0 ? {
            type: 'template',
            name,
            params,
            instances: [],
            node,
            scope: this,
        } : {
            type: 'declaration',
            name,
            node,
            scope: this,
        };

        this._entries.set(name, entry);
    }

    addInstance(name: string, schema: Schema, params: Schema[]) {
        const template = this._entries.get(name);

        invariant(template);
        invariant(template.type === 'template');

        template.instances.push({params, schema});
    }

    addDefinition(schema: Schema, declared: boolean) {
        const decl = this._entries.get(schema.name);

        if (declared) {
            invariant(decl);
            invariant(decl.type === 'declaration');
        } else {
            invariant(!decl);
        }

        this._entries.set(schema.name, {
            type: 'definition',
            schema,
            scope: this,
        });
    }

    addImport(info: ExternalInfo) {
        invariant(!this._entries.has(info.local));

        this._entries.set(info.local, {
            type: 'external',
            info,
            scope: this,
        });
    }

    addExport(name: string, reference: string) {
        invariant(this.module);

        this.module.addExport(name, this, reference);
    }

    resolve(path: string): string {
        invariant(this.module);

        return this.module.resolve(path);
    }

    query(name: string, params: Schema[]): Query {
        const entry = this._entries.get(name);

        if (entry && entry.type === 'template') {
            const augmented = entry.params.map((p, i) => params[i] || p.default);
            const schema = findInstance(entry, augmented);

            if (schema) {
                return {
                    type: 'definition',
                    schema,
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
            type: 'unknown',
        };
    }
}

function findInstance(template: Template, queried: Schema[]): ?Schema {
    for (const {schema, params} of template.instances) {
        // TODO: compare complex structures.
        const same = params.every((p, i) => p === queried[i]);

        if (same) {
            return schema;
        }
    }

    return null;
}
