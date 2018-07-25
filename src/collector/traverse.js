// @flow

import type {Node} from '@babel/types';
import {VISITOR_KEYS} from '@babel/types';

// Given the AST output of babylon parse, walk through in a depth-first order.
export default function* traverse(node: Node): Generator<Node, void, boolean> {
    const keys = VISITOR_KEYS[node.type];

    if (!keys) {
        return;
    }

    const done = yield node;

    if (done) {
        return;
    }

    for (const key of keys) {
        const subNode = (node: $FlowFixMe)[key];

        if (subNode instanceof Array) {
            for (const node of subNode) {
                yield* traverse(node);
            }
        } else if (subNode) {
            yield* traverse(subNode);
        }
    }
}
