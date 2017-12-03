// TODO: disassembly the test.
type Type = {
    a: string,

    foo(): void,

    b: boolean,

    baz: (() => void)[],

    bar: () => void,
    [string]: () => void,

    c: string & () => void,

    kek: [() => void],
};

interface Interface {
    a: string;

    foo(): void;

    b: boolean;

    baz: ?() => void;

    bar: () => void;
    [() => void]: string;

    c: string | () => void;

    kek: (() => string) & (() => void);
}

class Class {
    a: string;

    foo() {}
    get bar() {}
    set bar(a) {}

    b: boolean;

    static baz() {}

    baz: () => void;

    kek: (() => string) | (() => void);
}

export {Type, Interface, Class};
