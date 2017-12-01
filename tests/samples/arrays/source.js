type Type = {
    a: string[],
    b: Array<string>,
    c: $ReadOnlyArray<string>,
};

interface Interface {
    a: string[];
    b: Array<string>;
    c: $ReadOnlyArray<string>;
}

class Class {
    a: string[];
    b: Array<string>;
    c: $ReadOnlyArray<string>;
}

export {Type, Interface, Class};
