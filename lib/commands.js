'use strict';

class Command {
    static provide(schema) {
        return new Command('provide', schema);
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
