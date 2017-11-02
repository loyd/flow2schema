'use strict';

function partition(iter, predicate) {
    const left = [];
    const right = [];

    for (const item of iter) {
        (predicate(item) ? left : right).push(item);
    }

    return [left, right];
}

function log(arg, depth = 5) {
    console.dir(arg, {colors: true, depth});
}

module.exports = {
    partition,
    log,
};
