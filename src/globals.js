import {invariant} from './utils';
import type {Type} from './types';

export default {
    Object(params: (?Type)[]): ?Type {
        invariant(params.length === 0);

        return {
            kind: 'map',
            keys: {kind: 'mixed'},
            values: {kind: 'mixed'},
        };
    },
    Buffer(params: (?Type)[]): ?Type {
        invariant(params.length === 0);

        return {
            kind: 'reference',
            to: ['Buffer'],
        };
    },
    Array(params: (?Type)[]): ?Type {
        invariant(params.length === 1);
        invariant(params[0]);

        return {
            kind: 'array',
            items: params[0],
        };
    },
    $ReadOnlyArray(params: (?Type)[]): ?Type {
        invariant(params.length === 1);
        invariant(params[0]);

        return {
            kind: 'array',
            items: params[0],
        };
    },
}
