type Type = {
    a: 'one' | 'two' | number,
};

interface Interface {
    a: 'one' | 'two' | number;
}

class Class {
    a: 'one' | 'two' | number;
}

// ###
[
    {
        type: 'record',
        name: 'Type',
        fields: [{
            name: 'a',
            type: [
                'double',
                {type: 'enum', symbols: ['one', 'two']},
            ],
        }],
    },
    {
        type: 'record',
        name: 'Interface',
        fields: [{
            name: 'a',
            type: [
                'double',
                {type: 'enum', symbols: ['one', 'two']},
            ],
        }],
    },
    {
        type: 'record',
        name: 'Class',
        fields: [{
            name: 'a',
            type: [
                'double',
                {type: 'enum', symbols: ['one', 'two']},
            ],
        }],
    },
]
