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
        namespace: 'references',
    },
    {
        type: 'record',
        name: 'Type',
        namespace: 'references',
        fields: [
            {name: 'a', type: 'A'},
            {name: 'b', type: {type: 'array', items: 'A'}},
            {name: 'c', type: 'A'},
        ],
    },
    {
        type: 'record',
        name: 'Interface',
        namespace: 'references',
        fields: [
            {name: 'a', type: 'A'},
            {name: 'b', type: {type: 'array', items: 'A'}},
            {name: 'c', type: 'A'},
        ],
    },
    {
        type: 'record',
        name: 'Class',
        namespace: 'references',
        fields: [
            {name: 'a', type: 'A'},
            {name: 'b', type: {type: 'array', items: 'A'}},
            {name: 'c', type: 'A'},
        ],
    },
]
