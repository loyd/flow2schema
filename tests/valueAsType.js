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
        namespace: 'valueAsType',
        fields: [{name: 'a', type: {type: 'enum', symbols: ['one']}}],
    },
    {
        type: 'record',
        name: 'Interface',
        namespace: 'valueAsType',
        fields: [{name: 'a', type: {type: 'enum', symbols: ['one']}}],
    },
    {
        type: 'record',
        name: 'Class',
        namespace: 'valueAsType',
        fields: [{name: 'a', type: {type: 'enum', symbols: ['one']}}],
    },
]
