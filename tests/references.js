type A = {};

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
({
    A: {
        type: 'record',
        name: 'A',
        fields: [],
    },
    Type: {
        type: 'record',
        name: 'Type',
        fields: [
            {name: 'a', type: 'A'},
            {name: 'b', type: {type: 'array', items: 'A'}},
            {name: 'c', type: 'A'},
        ],
    },
    Interface: {
        type: 'record',
        name: 'Interface',
        fields: [
            {name: 'a', type: 'A'},
            {name: 'b', type: {type: 'array', items: 'A'}},
            {name: 'c', type: 'A'},
        ],
    },
    Class: {
        type: 'record',
        name: 'Class',
        fields: [
            {name: 'a', type: 'A'},
            {name: 'b', type: {type: 'array', items: 'A'}},
            {name: 'c', type: 'A'},
        ],
    },
});
