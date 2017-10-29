type Type = {
    a: A,
    b: B[],
    c: C<number>,
};

interface Interface {
    a: A;
    b: B[];
    c: C<number>;
}

class Class {
    a: A;
    b: B[];
    c: C<number>;
}

// ###
({
    Type: {
        type: 'record',
        name: 'Type',
        fields: [
            {name: 'a', type: 'A'},
            {name: 'b', type: {type: 'array', items: 'B'}},
            {name: 'c', type: 'C'},
        ],
    },
    Interface: {
        type: 'record',
        name: 'Interface',
        fields: [
            {name: 'a', type: 'A'},
            {name: 'b', type: {type: 'array', items: 'B'}},
            {name: 'c', type: 'C'},
        ],
    },
    Class: {
        type: 'record',
        name: 'Class',
        fields: [
            {name: 'a', type: 'A'},
            {name: 'b', type: {type: 'array', items: 'B'}},
            {name: 'c', type: 'C'},
        ],
    },
});
