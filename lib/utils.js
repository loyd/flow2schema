'use strict';

function partition(iter, predicate) {
    const left = [];
    const right = [];

    for (const item of iter) {
        (predicate(item) ? left : right).push(item);
    }

    return [left, right];
}

module.exports = {
    partition,
};
