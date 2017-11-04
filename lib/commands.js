'use strict';

class Command {
    static spawn(node) {
        return new Command('spawn', node);
    }

    static define(schema) {
        return new Command('define', schema);
    }

    static external(external) {
        return new Command('external', external);
    }

    static provide(internal) {
        return new Command('provide', internal);
    }

    static query(name) {
        return new Command('query', name);
    }

    static enter() {
        return new Command('enter');
    }

    static exit() {
        return new Command('exit');
    }

    static namespace() {
        return new Command('namespace');
    }

    constructor(name, data) {
        this.name = name;
        this.data = data;
    }
}

module.exports = Command;
