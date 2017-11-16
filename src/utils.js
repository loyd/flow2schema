export function partition(iter, predicate) {
    const left = [];
    const right = [];

    for (const item of iter) {
        (predicate(item) ? left : right).push(item);
    }

    return [left, right];
}

export function isNode(it) {
    return it && typeof it === 'object' && it.type;
}
