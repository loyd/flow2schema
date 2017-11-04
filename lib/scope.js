'use strict';

const assert = require('assert');
const pathlib = require('path');

const resolve = require('resolve');

class Scope {
    static global(schemas) {
        const global = new Scope(null, null);

        for (const schema of schemas) {
            global.addSchema(schema);
        }

        return global;
    }

    constructor(parent, module) {
        this.parent = parent;
        this.module = module;
        this.scopeId = module && module.generateScopeId();
        this.schemas = new Map;
        this.imports = new Map;
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

    addSchema(schema) {
        assert(!this.schemas.has(schema.name));

        this.schemas.set(schema.name, schema);
    }

    addImport(info) {
        assert(!this.imports.has(info.local));

        this.imports.set(info.local, info);
    }

    addExport(info) {
        assert(this.module);

        this.module.addExport(info.exported, info.schema);
    }

    resolve(path) {
        assert(this.module);

        return this.module.resolve(path);
    }

    query(name) {
        const result = this._querySchema(name) || this._queryImport(name);

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

    _querySchema(name) {
        const schema = this.schemas.get(name);

        return schema && {
            type: 'local',
            schema,
        };
    }

    _queryImport(name) {
        const info = this.imports.get(name);

        return info && {
            type: 'external',
            info,
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

    addExport(name, schema) {
        this.exports.set(name, schema);
    }

    query(name) {
        return this.exports.get(name) || null;
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
