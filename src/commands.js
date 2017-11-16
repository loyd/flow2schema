export default class Command {
    constructor(name, data) {
        this.name = name;
        this.data = data;
    }
}

export function declare(name, node, params) {
    return new Command('declare', [name, node, params]);
}

export function define(schema, declared = true) {
    return new Command('define', [schema, declared]);
}

export function external(external) {
    return new Command('external', external);
}

export function provide(name, reference = name) {
    return new Command('provide', [name, reference]);
}

export function query(name, params = null) {
    return new Command('query', [name, params]);
}

export function enter() {
    return new Command('enter');
}

export function exit() {
    return new Command('exit');
}

export function namespace() {
    return new Command('namespace');
}
