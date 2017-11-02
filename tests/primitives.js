type Type = {
    a: string,
    b: number,
    c: boolean,
    d: null,
    e: Buffer,
};

interface Interface {
    a: string;
    b: number;
    c: boolean;
    d: null;
    e: Buffer;
};

class Class {
    a: string;
    b: number;
    c: boolean;
    d: null;
    e: Buffer;
}

// ###
[
    {
        type: 'record',
        name: 'Type',
        fields: [
            {name: 'a', type: 'string'},
            {name: 'b', type: 'double'},
            {name: 'c', type: 'boolean'},
            {name: 'd', type: 'null'},
            {name: 'e', type: 'bytes'},
        ],
    },
    {
        type: 'record',
        name: 'Interface',
        fields: [
            {name: 'a', type: 'string'},
            {name: 'b', type: 'double'},
            {name: 'c', type: 'boolean'},
            {name: 'd', type: 'null'},
            {name: 'e', type: 'bytes'},
        ],
    },
    {
        type: 'record',
        name: 'Class',
        fields: [
            {name: 'a', type: 'string'},
            {name: 'b', type: 'double'},
            {name: 'c', type: 'boolean'},
            {name: 'd', type: 'null'},
            {name: 'e', type: 'bytes'},
        ],
    },
]
