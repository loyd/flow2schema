import * as assert from 'assert';

// I so much dream about the user guards...
// @see flow#112.
export const invariant = assert.ok;

export function last<T>(list: T[]): T {
    invariant(list.length > 0);

    return list[list.length - 1];
}

export function clone<T>(that: T): T {
    if (that == null || typeof that !== 'object') {
        return that;
    }

    if (that instanceof Array) {
        return that.map(clone);
    }

    const obj = {};

    for (const key in that) {
        obj[key] = clone(that[key]);
    }

    // TODO: we skip complex objects.
    return (obj: $FlowFixMe);
}
