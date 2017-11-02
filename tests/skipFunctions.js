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
