type Type = {
    a: string,

    foo(): void,

    b: boolean,

    bar: () => void,
};

interface Interface {
    a: string;

    foo(): void;

    b: boolean;

    bar: () => void;
}

class Class {
    a: string;

    foo() {}
    get bar() {}
    set bar(a) {}

    b: boolean;

    baz: () => void;
}

export {Type, Interface, Class};
