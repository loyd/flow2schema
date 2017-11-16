import * as assert from 'assert';

export default class CircularList {
    constructor() {
        this.mark = Symbol();
        this.prev = null;
        this.walk = null;
    }

    get isEmpty() {
        return !this.walk;
    }

    add(entry) {
        assert.ok(!entry[this.mark]);

        if (this.prev) {
            assert.ok(this.walk);

            this.prev = this.prev[this.mark] = entry;
        } else {
            assert.ok(!this.walk);

            this.walk = this.prev = entry;
        }

        entry[this.mark] = this.walk;

        assert.ok(!this.prev || this.prev[this.mark] === this.walk);
    }

    remove() {
        assert.ok(this.walk);

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
