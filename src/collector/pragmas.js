// @flow

import {ClassProperty, isObjectTypeProperty, ObjectTypeProperty} from '@babel/types';

import {invariant} from '../utils';

import type {Type} from '../types';
import {createNumber, isRepr} from '../types';

const PRAGMA_RE = /^\s*@(.+?)\s+{\s*(.+?)\s*}\s*$/gm;

export function extractPragmas(type: ?Type, text: string): ?Type {
    let match;

    while ((match = PRAGMA_RE.exec(text))) {
        type = processingPragma(type, match[1], match[2]);
    }

    return type;
}

const processingPragma = (type: ?Type, name: string, value: string): ?Type => {
    switch (name) {
        case 'repr':
            invariant(isRepr(value));

            return createNumber(value);
        case 'description':
        case 'title':
        case 'maxProperties':
        case 'minProperties':
        case 'patternProperties':
        case 'maxItems':
        case 'minItems':
        case 'uniqueItems':
        case 'multipleOf':
        case 'maximum':
        case 'exclusiveMaximum':
        case 'minimum':
        case 'exclusiveMinimum':
        case 'maxLength':
        case 'minLength':
        case 'pattern':
        case 'format':
            if (type) {
                // $FlowFixMe
                type[name] = value;
            }

            return type;
        default:
            throw `Unknown pragma: ${name}`;
    }
};
