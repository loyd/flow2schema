type Type = {
    a: string,
    b: number,
    c: boolean,
    d: null,
};

interface Interface {
    a: string;
    b: number;
    c: boolean;
    d: null;
};

class Class {
    a: string;
    b: number;
    c: boolean;
    d: null;
}

// ###
({
    Type: {
        type: 'record',
        name: 'Type',
        fields: [
            {name: 'a', type: 'string'},
            {name: 'b', type: 'double'},
            {name: 'c', type: 'boolean'},
            {name: 'd', type: 'null'},
        ],
    },
    Interface: {
        type: 'record',
        name: 'Interface',
        fields: [
            {name: 'a', type: 'string'},
            {name: 'b', type: 'double'},
            {name: 'c', type: 'boolean'},
            {name: 'd', type: 'null'},
        ],
    },
    Class: {
        type: 'record',
        name: 'Class',
        fields: [
            {name: 'a', type: 'string'},
            {name: 'b', type: 'double'},
            {name: 'c', type: 'boolean'},
            {name: 'd', type: 'null'},
        ],
    },
});
