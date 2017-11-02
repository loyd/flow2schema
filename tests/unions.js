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
[
    {
        type: 'record',
        name: 'Type',
        namespace: 'unions',
        fields: [{
            name: 'a',
            type: ['string', 'double'],
        }, {
            name: 'b',
            type: ['null', 'string'],
        }],
    },
    {
        type: 'record',
        name: 'Interface',
        namespace: 'unions',
        fields: [{
            name: 'a',
            type: ['string', 'double'],
        }, {
            name: 'b',
            type: ['null', 'string'],
        }],
    },
    {
        type: 'record',
        name: 'Class',
        namespace: 'unions',
        fields: [{
            name: 'a',
            type: ['string', 'double'],
        }, {
            name: 'b',
            type: ['null', 'string'],
        }],
    },
]
