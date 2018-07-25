// @flow

import {invariant} from './utils';
import type {TypeId, Type} from './types';

export default class Fund {
    _tops: Type[];
    _types: Map<string, Type>;

    constructor() {
        this._tops = [];
        this._types = new Map;
    }

    put(type: Type, topLevel: boolean = false) {
        invariant(type.id);

        if (topLevel) {
            this._tops.push(type);
        }

        this._types.set(JSON.stringify(type.id), type);
    }

    take(id: TypeId): Type {
        const type = this._types.get(JSON.stringify(id));

        invariant(type);

        return type;
    }

    takeAll(): Iterable<Type> {
        return this._types.values();
    }

    takeTops(): Iterable<Type> {
        return this._tops;
    }
}
