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
        namespace: 'unionsAndEnums',
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
        namespace: 'unionsAndEnums',
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
        namespace: 'unionsAndEnums',
        fields: [{
            name: 'a',
            type: [
                'double',
                {type: 'enum', symbols: ['one', 'two']},
            ],
        }],
    },
]
