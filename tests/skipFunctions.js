type Type = {
    a: string,

    foo(): void,

    b: number,
};

interface Interface {
    a: string;

    foo(): void;

    b: number;
}

class Class {
    a: string;

    foo() {}
    get bar() {}
    set bar(a) {}

    b: number;
}

// ###
[
    {
        type: 'record',
        name: 'Type',
        fields: [
            {name: 'a', type: 'string'},
            {name: 'b', type: 'double'},
        ],
    },
    {
        type: 'record',
        name: 'Interface',
        fields: [
            {name: 'a', type: 'string'},
            {name: 'b', type: 'double'},
        ],
    },
    {
        type: 'record',
        name: 'Class',
        fields: [
            {name: 'a', type: 'string'},
            {name: 'b', type: 'double'},
        ],
    },
]
