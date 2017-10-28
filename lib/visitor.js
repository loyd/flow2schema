'use strict';

// Given the AST output of babylon parse, walk through in a depth-first order,
// calling methods on the given visitor, providing context as the first argument.
function visit(ast, visitor, state) {
    let stack;
    let parent;
    let keys = [];
    let index = -1;

    do {
        ++index;

        if (stack && index === keys.length) {
            parent = stack.parent;
            keys = stack.keys;
            index = stack.index;
            stack = stack.prev;

            continue;
        }

        const node = parent ? parent[keys[index]] : ast.program;

        if (node && typeof node === 'object' && (node.type || node.length)) {
            const {type} = node;

            if (type) {
                if (type in visitor) {
                    const stop = visitor[type](node, state) === false;

                    if (stop) {
                        continue;
                    }
                }
            }

            stack = { parent, keys, index, prev: stack };
            parent = node;
            keys = Object.keys(node);
            index = -1;
        }
    } while (stack);
}

module.exports = visit;
