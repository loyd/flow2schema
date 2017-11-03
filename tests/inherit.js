class A {
    a: number;
}

class B extends A {
    b: string;
}

class C extends B {
    c: boolean;
}

// ###
[
    {
        type: 'record',
        name: 'A',
        namespace: 'inherit',
        fields: [{name: 'a', type: 'double'}],
    },
    {
        type: 'record',
        name: 'B',
        namespace: 'inherit',
        fields: [
            {name: 'a', type: 'double'},
            {name: 'b', type: 'string'},
        ],
    },
    {
        type: 'record',
        name: 'C',
        namespace: 'inherit',
        fields: [
            {name: 'a', type: 'double'},
            {name: 'b', type: 'string'},
            {name: 'c', type: 'boolean'},
        ],
    },
]
