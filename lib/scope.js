'use strict';

class Scope {
    constructor(parent) {
        this.schemas = new Map;
        this.externals = new Map;
        this.parent = parent;
    }

    addSchema(schema) {
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
