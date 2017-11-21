import * as assert from 'assert';

// I so much dream about the user guards...
// @see flow#112.
export const invariant = assert.ok;

export function partition<T>(iter: Iterable<T>, predicate: T => boolean): [T[], T[]] {
    const left = [];
    const right = [];

    for (const item of iter) {
        (predicate(item) ? left : right).push(item);
    }

    return [left, right];
}

export function map<T, R>(iter: Iterable<T>, mapper: T => R): R[] {
    const result = [];

    for (const item of iter) {
        result.push(mapper(item));
    }

    return result;
}

export function filter<T>(iter: Iterable<T>, predicate: T => boolean): T[] {
    const result = [];

    for (const item of iter) {
        if (predicate(item)) {
            result.push(item);
        }
    }

    return result;
}

export function filterMap<T, R>(iter: Iterable<T>, mapper: T => ?R): R[] {
    const result = [];

    for (const item of iter) {
        const it = mapper(item);

        if (it != null) {
            result.push(it);
        }
    }

    return result;
}

export function compact<T>(iter: Iterable<?T>): T[] {
    // $FlowFixMe
    return filter(iter, Boolean);
}

// $FlowFixMe
export function get<T: Object, K: $Keys<T>>(key: K): T => $ElementType<T, K> {
    return obj => obj[key];
}

export function negate<T>(pred: T => boolean): T => boolean {
    return flag => !flag;
}

export function compose<X, Y, Z>(a: X => Y, b: Y => Z): X => Z {
    return x => b(a(x));
}

export function last<T>(list: T[]): T | void {
    return list.length > 0 ? list[list.length - 1] : undefined;
}
