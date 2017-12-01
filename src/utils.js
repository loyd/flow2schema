import * as assert from 'assert';

// I so much dream about the user guards...
// @see flow#112.
export const invariant = assert.ok;

export function last<T>(list: T[]): T {
    invariant(list.length > 0);

    return list[list.length - 1];
}
