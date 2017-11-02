type Type = {
    a: 'one',
};

interface Interface {
    a: 'one';
}

class Class {
    a: 'one';
}

// ###
[
    {
        type: 'record',
        name: 'Type',
        fields: [{name: 'a', type: {type: 'enum', symbols: ['one']}}],
    },
    {
        type: 'record',
        name: 'Interface',
        fields: [{name: 'a', type: {type: 'enum', symbols: ['one']}}],
    },
    {
        type: 'record',
        name: 'Class',
        fields: [{name: 'a', type: {type: 'enum', symbols: ['one']}}],
    },
]
