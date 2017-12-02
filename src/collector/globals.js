import wu from 'wu';

import {invariant} from '../utils';
import type {Type, TypeId} from '../types';
import * as t from '../types';

function object(params: (?Type)[]): ?Type {
    invariant(params.length === 0);

    return t.createMap(t.createMixed(), t.createMixed());
}

function buffer(params: (?Type)[]): ?Type {
    invariant(params.length === 0);

    return t.createReference(['Buffer']);
}

function array(params: (?Type)[]): ?Type {
    invariant(params.length === 1);
    invariant(params[0]);

    return t.createArray(t.clone(params[0]));
}

function elemType(params: (?Type)[], resolve: TypeId => Type): ?Type {
    invariant(params.length === 2);

    const [ref, key] = params;

    invariant(ref && key);
    invariant(ref.kind === 'reference');

    const record = resolve(ref.to);

    invariant(record.kind === 'record');

    // TODO: support for references.
    invariant(key.kind === 'literal');
    invariant(typeof key.value === 'string');

    const field = wu(record.fields).find(field => field.name === key.value);

    // TODO: what about removing "id"?
    return field ? t.clone(field.value) : null;
}

function stripMaybe(params: (?Type)[], resolve: TypeId => Type): ?Type {
    invariant(params.length === 1);

    const [ref] = params;

    invariant(ref && ref.kind === 'reference');

    const maybe = resolve(ref.to);

    // TODO: support for unions and nested maybe.
    if (maybe.kind !== 'maybe') {
        return t.clone(ref);
    }

    return t.clone(maybe.value);
}

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

function unwrap(params: (?Type)[]): ?Type {
    invariant(params.length === 1);

    const [type] = params;

    return type ? t.clone(type) : null;
}

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
    // TODO: $All
    // TODO: $Either
};
