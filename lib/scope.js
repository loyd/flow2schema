'use strict';

const assert = require('assert');

class Scope {
    static global(schemas) {
        return new Scope(null, '', schemas);
    }

    constructor(parent, namespace, schemas) {
        this.parent = parent;
        this.schemas = new Map(schemas);
        this.externals = new Map;
        this.namespace = namespace;
        this.childCount = 0;
    }

    extend(namespace = null) {
        if (!namespace) {
            namespace = `${this.namespace}._${this.childCount++}`;
        }

        return new Scope(this, namespace, []);
    }

    addSchema(schema) {
        assert(!this.schemas.has(schema.name));

        this.schemas.set(schema.name, schema);
    }

    addExternal(external) {
        this.externals.set(external.name, external);
    }

    query(name) {
        const result = this._querySchema(name) || this._queryExternal(name);

        if (result) {
            return result;
        }

        if (this.parent) {
            return this.parent.query(name);
        }

        return null;
    }

    _querySchema(name) {
        const schema = this.schemas.get(name);

        return schema ? {
            type: 'local',
            schema,
        } : null;
    }

    _queryExternal(name) {
        const info = this.externals.get(name);

        return info ? {
            type: 'external',
            info,
        } : null;
    }
}

module.exports = Scope;
