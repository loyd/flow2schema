type Type = {
    a: number[],
};

interface Interface {
    a: number[];
}

class Class {
    a: number[];
}

// ###
[
    {
        type: 'record',
        name: 'Type',
        fields: [{
            name: 'a',
            type: {type: 'array', items: 'double'},
        }],
    },
    {
        type: 'record',
        name: 'Interface',
        fields: [{
            name: 'a',
            type: {type: 'array', items: 'double'},
        }],
    },
    {
        type: 'record',
        name: 'Class',
        fields: [{
            name: 'a',
            type: {type: 'array', items: 'double'},
        }],
    },
]
