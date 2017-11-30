import wu from 'wu';

import {invariant, clone} from './utils';
import type {Type, TypeId} from './types';

function object(params: (?Type)[]): ?Type {
    invariant(params.length === 0);

    return {
        kind: 'map',
        keys: {kind: 'mixed'},
        values: {kind: 'mixed'},
    };
}

function buffer(params: (?Type)[]): ?Type {
    invariant(params.length === 0);

    return {
        kind: 'reference',
        to: ['Buffer'],
    };
}

function array(params: (?Type)[]): ?Type {
    invariant(params.length === 1);
    invariant(params[0]);

    return {
        kind: 'array',
        items: params[0],
    };
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
    return field ? clone(field.value) : null;
}

function stripMaybe(params: (?Type)[], resolve: TypeId => Type): ?Type {
    invariant(params.length === 1);

    const [ref] = params;

    invariant(ref && ref.kind === 'reference');

    const maybe = resolve(ref.to);

    // TODO: support for unions and nested maybe.
    if (maybe.kind !== 'maybe') {
        return clone(ref);
    }

    return clone(maybe.value);
}

function shape(params: (?Type)[], resolve: TypeId => Type): ?Type {
    invariant(params.length === 1);

    const [ref] = params;

    invariant(ref && ref.kind === 'reference');

    const record = resolve(ref.to);

    invariant(record.kind === 'record');

    const fields = wu(record.fields)
        .map(clone)
        .tap(field => field.required = false)
        .toArray();

    return {
        kind: 'record',
        fields,
    };
}

function unwrap(params: (?Type)[]): ?Type {
    invariant(params.length === 1);

    const [type] = params;

    return type ? clone(type) : null;
}

function keys(params: (?Type)[], resolve: TypeId => Type): ?Type {
    invariant(params.length === 1);

    const [ref] = params;

    invariant(ref && ref.kind === 'reference');

    const record = resolve(ref.to);

    invariant(record.kind === 'record');

    const variants =  wu(record.fields)
        .pluck('name')
        .map(name => ({kind: 'literal', value: name}))
        .toArray();

    // TODO: empty records.

    return {
        kind: 'union',
        variants,
    };
}

function values(params: (?Type)[], resolve: TypeId => Type): ?Type {
    invariant(params.length === 1);

    const [ref] = params;

    invariant(ref && ref.kind === 'reference');

    const record = resolve(ref.to);

    invariant(record.kind === 'record');

    const variants =  wu(record.fields)
        .pluck('value')
        .map(clone)
        .toArray();

    // TODO: empty records.
    // TODO: dedup values.

    return {
        kind: 'union',
        variants,
    };
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
    // TODO: $Diff
    // TODO: $All
    // TODO: $Either
};
