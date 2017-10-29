type Type = {
    [string]: number,
};

interface Interface {
    [string]: number;
}

// ###
({
    Type: {
        type: 'map',
        name: 'Type',
        values: 'double',
    },
    Interface: {
        type: 'map',
        name: 'Interface',
        values: 'double',
    },
});
