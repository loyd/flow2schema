type Type = {
    a: 'one' | 'two',
};

interface Interface {
    a: 'one' | 'two';
}

class Class {
    a: 'one' | 'two';
}

// ###
[
    {
        type: 'record',
        name: 'Type',
        namespace: 'enums',
        fields: [{
            name: 'a',
            type: {type: 'enum', symbols: ['one', 'two']},
        }],
    },
    {
        type: 'record',
        name: 'Interface',
        namespace: 'enums',
        fields: [{
            name: 'a',
            type: {type: 'enum', symbols: ['one', 'two']},
        }],
    },
    {
        type: 'record',
        name: 'Class',
        namespace: 'enums',
        fields: [{
            name: 'a',
            type: {type: 'enum', symbols: ['one', 'two']},
        }],
    },
]
