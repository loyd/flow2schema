import * as assert from 'assert';

// I so much dream about the user guards...
// @see flow#112.
export const invariant = assert.ok;

export function last<T>(list: T[]): T {
    invariant(list.length > 0);

    return list[list.length - 1];
}

export function collect<T>(iter: Iterable<[string, T]>): {[string]: T} {
    const result = {};

    for (const [key, value] of iter) {
        result[key] = value;
    }

    return result;
}
