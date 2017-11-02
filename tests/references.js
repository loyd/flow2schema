type A = string;

type Type = {
    a: A,
    b: A[],
    c: A<number>,
};

interface Interface {
    a: A;
    b: A[];
    c: A<number>;
}

class Class {
    a: A;
    b: A[];
    c: A<number>;
}

// ###
[
    {
        type: 'string',
        name: 'A',
    },
    {
        type: 'record',
        name: 'Type',
        fields: [
            {name: 'a', type: 'A'},
            {name: 'b', type: {type: 'array', items: 'A'}},
            {name: 'c', type: 'A'},
        ],
    },
    {
        type: 'record',
        name: 'Interface',
        fields: [
            {name: 'a', type: 'A'},
            {name: 'b', type: {type: 'array', items: 'A'}},
            {name: 'c', type: 'A'},
        ],
    },
    {
        type: 'record',
        name: 'Class',
        fields: [
            {name: 'a', type: 'A'},
            {name: 'b', type: {type: 'array', items: 'A'}},
            {name: 'c', type: 'A'},
        ],
    },
]
