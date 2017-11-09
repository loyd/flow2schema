'use strict';

class Command {
    static declare(name, node) {
        return new Command('declare', [name, node]);
    }

    static define(schema, declared = true) {
        return new Command('define', [schema, declared]);
    }

    static external(external) {
        return new Command('external', external);
    }

    static provide(name, reference = name) {
        return new Command('provide', [name, reference]);
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
