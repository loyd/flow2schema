import {invariant} from './utils';
import type {Type} from './types';

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

export default {
    Object: object,
    Buffer: buffer,
    Array: array,
    $ReadOnlyArray: array,
};
