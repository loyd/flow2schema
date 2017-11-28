import {invariant} from './utils';
import type {Type} from './types';

export default {
    Buffer() {
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
