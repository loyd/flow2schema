// @flow

import wu from 'wu';

import {invariant} from '../utils';
import type {Type, TypeId} from '../types';
import * as t from '../types';

// Object.
function object(params: (?Type)[]): ?Type {
    invariant(params.length === 0);

    return t.createMap(t.createMixed(), t.createMixed());
}

// Buffer.
function buffer(params: (?Type)[]): ?Type {
    invariant(params.length === 0);

    return t.createReference(['Buffer']);
}

// Array<T> and $ReadOnlyArray<T>.
function array(params: (?Type)[]): ?Type {
    invariant(params.length === 1);
    invariant(params[0]);

    return t.createArray(t.clone(params[0]));
}

// $ElementType<T, K> and $PropertyType<T, k>.
function elemType(params: (?Type)[], resolve: TypeId => Type): ?Type {
    invariant(params.length === 2);

    const [ref, key] = params;

    invariant(ref && key);
    invariant(ref.kind === 'reference');

    const record = resolve(ref.to);

    invariant(record.kind === 'record');

    const prop = key.kind === 'reference' ? resolve(key.to) : key;

    invariant(prop.kind === 'literal');
    invariant(typeof prop.value === 'string');

    const field = wu(record.fields).find(field => field.name === prop.value);

    return field ? t.clone(field.value) : null;
}

// $NonMaybeType<T>.
function stripMaybe(params: (?Type)[], resolve: TypeId => Type): ?Type {
    invariant(params.length === 1);

    const [ref] = params;

    invariant(ref && ref.kind === 'reference');

    const maybe = resolve(ref.to);

    // TODO: support for unions.
    if (maybe.kind !== 'maybe') {
        return t.clone(ref);
    }

    return t.clone(maybe.value);
}

// $Shape<T>.
function shape(params: (?Type)[], resolve: TypeId => Type): ?Type {
    invariant(params.length === 1);

    const [ref] = params;

    invariant(ref && ref.kind === 'reference');

    const record = resolve(ref.to);

    invariant(record.kind === 'record');

    const fields = wu(record.fields)
        .map(field => ({
            name: field.name,
            value: t.clone(field.value),
            required: false,
        }))
        .toArray();

    return t.createRecord(fields);
}

// $Exact<T> and $ReadOnly<T>.
function unwrap(params: (?Type)[]): ?Type {
    invariant(params.length === 1);

    const [type] = params;

    return type ? t.clone(type) : null;
}

// $Keys<T>.
function keys(params: (?Type)[], resolve: TypeId => Type): ?Type {
    invariant(params.length === 1);

    const [ref] = params;

    invariant(ref && ref.kind === 'reference');

    const record = resolve(ref.to);

    invariant(record.kind === 'record');

    const variants =  wu(record.fields)
        .pluck('name')
        .map(t.createLiteral)
        .toArray();

    // TODO: empty records.

    return t.createUnion(variants);
}

// $Values<T>.
function values(params: (?Type)[], resolve: TypeId => Type): ?Type {
    invariant(params.length === 1);

    const [ref] = params;

    invariant(ref && ref.kind === 'reference');

    const record = resolve(ref.to);

    invariant(record.kind === 'record');

    const variants =  wu(record.fields)
        .pluck('value')
        .map(t.clone)
        .toArray();

    // TODO: empty records.
    // TODO: dedup values.

    return t.createUnion(variants);
}

// $Diff<M, S>.
function diff(params: (?Type)[], resolve: TypeId => Type): ?Type {
    invariant(params.length === 2);

    let [minuend, subtrahend] = params;

    invariant(minuend && subtrahend);
    invariant(minuend.kind === 'reference');

    minuend = resolve(minuend.to);

    invariant(minuend.kind === 'record');

    if (subtrahend.kind === 'reference') {
        subtrahend = resolve(subtrahend.to);
    }

    invariant(subtrahend.kind === 'record');

    // TODO: more clever subtraction.
    const blacklist = wu(subtrahend.fields).pluck('name').toArray();

    const fields = wu(minuend.fields)
        .filter(field => !blacklist.includes(field.name))
        .map(field => ({
            name: field.name,
            value: t.clone(field.value),
            required: field.required,
        }))
        .toArray();

    return t.createRecord(fields);
}

// $All<M, S>.
function all(params: (?Type)[]): ?Type {
    const parts = wu(params).filter().toArray();

    return parts.length === 0 ? null
         : parts.length === 1 ? parts[0]
         : t.createIntersection(parts);
}

// $Either<M, S>.
function either(params: (?Type)[]): ?Type {
    const variants = wu(params).filter().toArray();

    return variants.length === 0 ? null
         : variants.length === 1 ? variants[0]
         : t.createUnion(variants);
}

// $ FlowFixMe
function fixMe(): ?Type {
    return t.createAny();
}

export default {
    Object: object,
    Buffer: buffer,
    Array: array,
    $ReadOnlyArray: array,
    $PropertyType: elemType,
    $ElementType: elemType,
    $NonMaybeType: stripMaybe,
    $Shape: shape,
    $ReadOnly: unwrap,
    $Exact: unwrap, // TODO: another semantic for exact types?
    $Keys: keys,
    $Values: values,
    $Diff: diff,
    $All: all,
    $Either: either,
    $FlowFixMe: fixMe,
};
