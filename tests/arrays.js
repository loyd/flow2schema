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
({
    Type: {
        type: 'record',
        name: 'Type',
        fields: [{
            name: 'a',
            type: {type: 'array', items: 'double'},
        }],
    },
    Interface: {
        type: 'record',
        name: 'Interface',
        fields: [{
            name: 'a',
            type: {type: 'array', items: 'double'},
        }],
    },
    Class: {
        type: 'record',
        name: 'Class',
        fields: [{
            name: 'a',
            type: {type: 'array', items: 'double'},
        }],
    },
});
