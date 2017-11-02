'use strict';

class Command {
    static provide(schema) {
        return new Command('provide', {schema});
    }

    constructor(name, fields) {
        this.name = name;

        Object.assign(this, fields);
    }
}

module.exports = Command;
