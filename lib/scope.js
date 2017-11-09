'use strict';

const assert = require('assert');
const pathlib = require('path');

const resolve = require('resolve');

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

    addDefinition(schema, declared = true) {
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

class Module {
    constructor(path, namespace) {
        this.path = path;
        this.namespace = namespace;
        this.scopeCount = 0;
        this.exports = new Map;
    }

    generateScopeId() {
        return this.scopeCount++;
    }

    addExport(name, scope, reference) {
        this.exports.set(name, [scope, reference]);
    }

    query(name) {
        const result = this.exports.get(name);

        if (!result) {
            return {
                type: 'unknown',
            };
        }

        const [scope, reference] = result;

        return scope.query(reference);
    }

    resolve(path) {
        const basedir = pathlib.dirname(this.path);

        // TODO: follow symlinks.
        return resolve.sync(path, {basedir});
    }
}

module.exports = {
    Scope,
    Module,
};
