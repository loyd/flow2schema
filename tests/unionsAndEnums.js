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
({
    Type: {
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
    Interface: {
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
    Class: {
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
});
