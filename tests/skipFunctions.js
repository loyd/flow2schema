type Type = {
    a: string,

    foo(): void,

    b: number,

    bar: () => void,
};

interface Interface {
    a: string;

    foo(): void;

    b: number;

    bar: () => void;
}

class Class {
    a: string;

    foo() {}
    get bar() {}
    set bar(a) {}

    b: number;

    baz: () => void;
}
