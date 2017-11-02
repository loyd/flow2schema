type Type = {
    a: string | number,
    b: ?string,
};

interface Interface {
    a: string | number;
    b: ?string;
}

class Class {
    a: string | number;
    b: ?string;
}

// ###
({
    Type: {
        type: 'record',
        name: 'Type',
        fields: [{
            name: 'a',
            type: ['string', 'double'],
        }, {
            name: 'b',
            type: ['null', 'string'],
        }],
    },
    Interface: {
        type: 'record',
        name: 'Interface',
        fields: [{
            name: 'a',
            type: ['string', 'double'],
        }, {
            name: 'b',
            type: ['null', 'string'],
        }],
    },
    Class: {
        type: 'record',
        name: 'Class',
        fields: [{
            name: 'a',
            type: ['string', 'double'],
        }, {
            name: 'b',
            type: ['null', 'string'],
        }],
    },
});