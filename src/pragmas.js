import {invariant} from './utils';

import type {Type} from './types';

export type Pragma =
    | TypePragma;

export type TypePragma = {
    kind: 'type',
    value: Type,
};

const PRAGMA_RE = /^\s*@repr\s+\{\s*(.+?)\s*\}\s*$/gm;

export function extractPragmas(text: string): Pragma[] {
    const pragmas = [];
    let match;

    while ((match = PRAGMA_RE.exec(text))) {
        const repr = match[1];

        invariant(['i32', 'i64', 'u32', 'u64', 'f32', 'f64'].includes(repr));

        const pragma = {
            kind: 'type',
            value: {
                kind: 'number',
                repr,
            },
        };

        if (pragma) {
            pragmas.push(pragma);
        }
    }

    return pragmas;
}
