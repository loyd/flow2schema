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

// ###
[
    {
        type: 'record',
        name: 'Type',
        namespace: 'skipFunctions',
        fields: [
            {name: 'a', type: 'string'},
            {name: 'b', type: 'double'},
        ],
    },
    {
        type: 'record',
        name: 'Interface',
        namespace: 'skipFunctions',
        fields: [
            {name: 'a', type: 'string'},
            {name: 'b', type: 'double'},
        ],
    },
    {
        type: 'record',
        name: 'Class',
        namespace: 'skipFunctions',
        fields: [
            {name: 'a', type: 'string'},
            {name: 'b', type: 'double'},
        ],
    },
]
