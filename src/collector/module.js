// @flow

import * as pathlib from 'path';
import * as resolve from 'resolve';

import type Scope from './scope';
import type {Type, TypeId} from '../types';
import type {Query} from './query';

export default class Module {
    +id: TypeId;
    +path: string;
    _scopeCount: number;
    _exports: Map<?string, [Scope, string]>;

    constructor(id: TypeId, path: string) {
        this.id = id;
        this.path = path;
        this._scopeCount = 0;
        this._exports = new Map;
    }

    generateScopeId(): TypeId {
        if (this._scopeCount === 0) {
            ++this._scopeCount;
            return this.id;
        }

        return this.id.concat(String(this._scopeCount++));
    }

    addExport(name: ?string, scope: Scope, reference: string) {
        this._exports.set(name, [scope, reference]);
    }

    query(name: ?string, params: (?Type)[]): Query {
        const result = this._exports.get(name);

        if (!result) {
            return {
                kind: 'unknown',
            };
        }

        const [scope, reference] = result;

        return scope.query(reference, params);
    }

    resolve(path: string, extensions: ?string[]): string {
        const basedir = pathlib.dirname(this.path);

        // TODO: follow symlinks.
        return resolve.sync(path, {basedir, extensions: (extensions || []).concat(['.js'])});
    }

    exports(): Iterator<[Scope, string]> {
        return this._exports.values();
    }
}
