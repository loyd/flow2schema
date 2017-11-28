import wu from 'wu';

import {invariant} from './utils';
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

    return field ? Object.assign({}, (field.value: $FlowFixMe)) : null;
}

export default {
    Object: object,
    Buffer: buffer,
    Array: array,
    $ReadOnlyArray: array,
    $PropertyType: elemType,
    $ElementType: elemType,
};
