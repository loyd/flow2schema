import * as pathlib from 'path';
import * as resolve from 'resolve';

import type Scope from './scope';
import type {Schema, Type} from './schema';
import type {Query} from './query';

export default class Module {
    +path: string;
    +namespace: string;
    _scopeCount: number;
    _exports: Map<?string, [Scope, string]>;

    constructor(path: string, namespace: string) {
        this.path = path;
        this.namespace = namespace;
        this._scopeCount = 0;
        this._exports = new Map;
    }

    generateScopeId(): number {
        return this._scopeCount++;
    }

    addExport(name: ?string, scope: Scope, reference: string) {
        this._exports.set(name, [scope, reference]);
    }

    query(name: ?string, params: (?Type)[]): Query {
        const result = this._exports.get(name);

        if (!result) {
            return {
                type: 'unknown',
            };
        }

        const [scope, reference] = result;

        return scope.query(reference, params);
    }

    resolve(path: string): string {
        const basedir = pathlib.dirname(this.path);

        // TODO: follow symlinks.
        return resolve.sync(path, {basedir});
    }

    exports(): Iterator<[Scope, string]> {
        return this._exports.values();
    }
}
