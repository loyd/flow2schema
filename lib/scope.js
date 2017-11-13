'use strict';

const assert = require('assert');

class Scope {
    static global(schemas) {
        const global = new Scope(null, null);

        for (const schema of schemas) {
            global.addDefinition(schema, false);
        }

        return global;
    }

    constructor(parent, module) {
        this.parent = parent;
        this.module = module;
        this.scopeId = module && module.generateScopeId();
        this.entries = new Map;
    }

    get namespace() {
        assert(this.module);

        let namespace = this.module.namespace;

        // Nested scopes.
        if (this.scopeId > 0) {
            namespace += '._' + this.scopeId;
        }

        return namespace;
    }

    extend(module = null) {
        return new Scope(this, module || this.module);
    }

    addDeclaration(name, node, params) {
        assert(!this.entries.has(name));

        const isTemplate = Boolean(params);

        const entry = {
            type: isTemplate ? 'template' : 'declaration',
            name,
            node,
            scope: this,
        };

        if (isTemplate) {
            entry.params = params;
            entry.instances = [];
        }

        this.entries.set(name, entry);
    }

    addInstance(name, schema, params) {
        const template = this.entries.get(name);

        assert(template);
        assert.equal(template.type, 'template');

        template.instances.push({params, schema});
    }

    addDefinition(schema, declared) {
        const decl = this.entries.get(schema.name);

        if (declared) {
            assert(decl);
            assert.equal(decl.type, 'declaration');
        } else {
            assert(!decl);
        }

        this.entries.set(schema.name, {
            type: 'definition',
            schema,
            scope: this,
        });
    }

    addImport(info) {
        assert(!this.entries.has(info.local));

        this.entries.set(info.local, {
            type: 'external',
            info,
            scope: this,
        });
    }

    addExport(name, reference) {
        assert(this.module);

        this.module.addExport(name, this, reference);
    }

    resolve(path) {
        assert(this.module);

        return this.module.resolve(path);
    }

    query(name, params) {
        const entry = this.entries.get(name);

        if (entry && entry.type === 'template') {
            assert(params);

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
            return this.parent.query(name);
        }

        return {
            type: 'unknown',
        };
    }
}

function findInstance(template, queried) {
    for (const {schema, params} of template.instances) {
        // TODO: compare complex structures.
        const same = params.every((p, i) => p === queried[i]);

        if (same) {
            return schema;
        }
    }

    return null;
}

module.exports = Scope;
