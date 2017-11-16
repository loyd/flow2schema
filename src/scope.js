import * as assert from 'assert';

export default class Scope {
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
        assert.ok(this.module);

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
        assert.ok(!this.entries.has(name));

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

        assert.ok(template);
        assert.equal(template.type, 'template');

        template.instances.push({params, schema});
    }

    addDefinition(schema, declared) {
        const decl = this.entries.get(schema.name);

        if (declared) {
            assert.ok(decl);
            assert.equal(decl.type, 'declaration');
        } else {
            assert.ok(!decl);
        }

        this.entries.set(schema.name, {
            type: 'definition',
            schema,
            scope: this,
        });
    }

    addImport(info) {
        assert.ok(!this.entries.has(info.local));

        this.entries.set(info.local, {
            type: 'external',
            info,
            scope: this,
        });
    }

    addExport(name, reference) {
        assert.ok(this.module);

        this.module.addExport(name, this, reference);
    }

    resolve(path) {
        assert.ok(this.module);

        return this.module.resolve(path);
    }

    query(name, params) {
        const entry = this.entries.get(name);

        if (entry && entry.type === 'template') {
            assert.ok(params);

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
