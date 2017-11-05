'use strict';

const assert = require('assert');

class CircularList {
    constructor() {
        this.mark = Symbol();
        this.prev = null;
        this.walk = null;
    }

    get isEmpty() {
        return !this.walk;
    }

    add(entry) {
        assert(!entry[this.mark]);

        if (this.prev) {
            assert(this.walk);

            this.prev = this.prev[this.mark] = entry;
        } else {
            assert(!this.walk);

            this.walk = this.prev = entry;
        }

        entry[this.mark] = this.walk;

        assert(!this.prev || this.prev[this.mark] === this.walk);
    }

    remove() {
        assert(this.walk);

        const removed = this.walk;

        if (removed === this.prev) {
            this.walk = this.prev = null;
        } else {
            this.walk = this.prev[this.mark] = removed[this.mark];
        }

        removed[this.mark] = null;

        return removed;
    }
}

module.exports = CircularList;
