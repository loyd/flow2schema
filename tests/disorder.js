type X = {
    y: Y,
};

type Y = {
    z: Z,
};

type Z = string;

// ###
[
    {
        type: 'string',
        name: 'Z',
        namespace: 'disorder',
    },
    {
        type: 'record',
        name: 'Y',
        namespace: 'disorder',
        fields: [{name: 'z', type: 'Z'}],
    },
    {
        type: 'record',
        name: 'X',
        namespace: 'disorder',
        fields: [{name: 'y', type: 'Y'}],
    },
]
