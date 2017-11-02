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
        fields: [{
            name: 'a',
            type: {type: 'enum', symbols: ['one', 'two']},
        }],
    },
    {
        type: 'record',
        name: 'Interface',
        fields: [{
            name: 'a',
            type: {type: 'enum', symbols: ['one', 'two']},
        }],
    },
    {
        type: 'record',
        name: 'Class',
        fields: [{
            name: 'a',
            type: {type: 'enum', symbols: ['one', 'two']},
        }],
    },
]
