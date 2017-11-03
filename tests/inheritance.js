class A {
    a: number;
}

class B extends A {
    b: string;
}

class C extends B {
    c: boolean;
}

interface X {
    x: number;
}

interface Y extends X {
    y: string;
}

interface Z extends Y {
    z: boolean;
}

// ###
[
    {
        type: 'record',
        name: 'A',
        namespace: 'inheritance',
        fields: [{name: 'a', type: 'double'}],
    },
    {
        type: 'record',
        name: 'B',
        namespace: 'inheritance',
        fields: [
            {name: 'a', type: 'double'},
            {name: 'b', type: 'string'},
        ],
    },
    {
        type: 'record',
        name: 'C',
        namespace: 'inheritance',
        fields: [
            {name: 'a', type: 'double'},
            {name: 'b', type: 'string'},
            {name: 'c', type: 'boolean'},
        ],
    },
    {
        type: 'record',
        name: 'X',
        namespace: 'inheritance',
        fields: [{name: 'x', type: 'double'}],
    },
    {
        type: 'record',
        name: 'Y',
        namespace: 'inheritance',
        fields: [
            {name: 'x', type: 'double'},
            {name: 'y', type: 'string'},
        ],
    },
    {
        type: 'record',
        name: 'Z',
        namespace: 'inheritance',
        fields: [
            {name: 'x', type: 'double'},
            {name: 'y', type: 'string'},
            {name: 'z', type: 'boolean'},
        ],
    },
]
