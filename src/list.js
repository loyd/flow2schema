import {invariant} from './utils';

export default class CircularList<T: Object> {
    _mark: Symbol;
    _prev: ?T;
    _walk: ?T;

    constructor() {
        this._mark = Symbol();
        this._prev = null;
        this._walk = null;
    }

    get isEmpty(): boolean {
        return !this._walk;
    }

    add(entry: T) {
        invariant(!entry[this._mark]);

        if (this._prev) {
            invariant(this._walk);

            this._prev = this._prev[this._mark] = entry;
        } else {
            invariant(!this._walk);

            this._walk = this._prev = entry;
        }

        entry[this._mark] = this._walk;

        invariant(!this._prev || this._prev[this._mark] === this._walk);
    }

    remove(): T {
        invariant(this._walk);

        const removed = this._walk;

        if (removed === this._prev) {
            this._walk = this._prev = null;
        } else {
            invariant(this._prev);
            this._walk = this._prev[this._mark] = removed[this._mark];
        }

        removed[this._mark] = null;

        return removed;
    }
}
