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

    addDeclaration(name, node) {
        assert(!this.entries.has(name));

        this.entries.set(name, {
            type: 'declaration',
            name,
            node,
            scope: this,
        });
    }

    addDefinition(schema, declared) {
        if (declared) {
            assert.equal((this.entries.get(schema.name) || {}).type, 'declaration');
        } else {
            assert(!this.entries.has(schema.name));
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

    query(name) {
        const result = this.entries.get(name);

        if (result) {
            return result;
        }

        if (this.parent) {
            return this.parent.query(name);
        }

        return {
            type: 'unknown',
        };
    }
}

module.exports = Scope;
