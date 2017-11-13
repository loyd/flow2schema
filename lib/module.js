'use strict';

const pathlib = require('path');

const resolve = require('resolve');

class Module {
    constructor(path, namespace) {
        this.path = path;
        this.namespace = namespace;
        this.scopeCount = 0;
        this._exports = new Map;
    }

    generateScopeId() {
        return this.scopeCount++;
    }

    addExport(name, scope, reference) {
        this._exports.set(name, [scope, reference]);
    }

    query(name, params) {
        const result = this._exports.get(name);

        if (!result) {
            return {
                type: 'unknown',
            };
        }

        const [scope, reference] = result;

        return scope.query(reference, params);
    }

    resolve(path) {
        const basedir = pathlib.dirname(this.path);

        // TODO: follow symlinks.
        return resolve.sync(path, {basedir});
    }

    exports() {
        return this._exports.values();
    }
}

module.exports = Module;
