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
({
    Type: {
        type: 'record',
        name: 'Type',
        fields: [{name: 'a', type: {type: 'enum', symbols: ['one']}}],
    },
    Interface: {
        type: 'record',
        name: 'Interface',
        fields: [{name: 'a', type: {type: 'enum', symbols: ['one']}}],
    },
    Class: {
        type: 'record',
        name: 'Class',
        fields: [{name: 'a', type: {type: 'enum', symbols: ['one']}}],
    },
});
