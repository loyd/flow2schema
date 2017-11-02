type X = string;

type Y = {
    x: X,
};

(function () {
    type X = number;

    type Y = {
        x: X,
    };

    type Z = string;

    function foo() {
        type X = boolean;

        type Y = {
            x: X,
            z: Z,
        };
    }

    class Test {
        static bar() {
            type X = number;

            type Y = {
                x: X,
                z: Z,
            };
        }

        baz() {
            type X = string;

            type Y = {
                x: X,
                z: Z,
            };
        }
    }
})();

// ###
[
    {
        type: 'string',
        name: 'X',
        namespace: 'scopes',
    },
    {
        type: 'record',
        name: 'Y',
        namespace: 'scopes',
        fields: [{name: 'x', type: 'X'}],
    },
    {
        type: 'double',
        name: 'X',
        namespace: 'scopes._0',
    },
    {
        type: 'record',
        name: 'Y',
        namespace: 'scopes._0',
        fields: [{name: 'x', type: 'X'}],
    },
    {
        type: 'string',
        name: 'Z',
        namespace: 'scopes._0',
    },
    {
        type: 'boolean',
        name: 'X',
        namespace: 'scopes._0._0',
    },
    {
        type: 'record',
        name: 'Y',
        namespace: 'scopes._0._0',
        fields: [
            {name: 'x', type: 'X'},
            {name: 'z', type: 'scopes._0.Z'},
        ],
    },
    {
        type: 'double',
        name: 'X',
        namespace: 'scopes._0._1',
    },
    {
        type: 'record',
        name: 'Y',
        namespace: 'scopes._0._1',
        fields: [
            {name: 'x', type: 'X'},
            {name: 'z', type: 'scopes._0.Z'},
        ],
    },
    {
        type: 'string',
        name: 'X',
        namespace: 'scopes._0._2',
    },
    {
        type: 'record',
        name: 'Y',
        namespace: 'scopes._0._2',
        fields: [
            {name: 'x', type: 'X'},
            {name: 'z', type: 'scopes._0.Z'},
        ],
    },
    {
        type: 'record',
        name: 'Test',
        namespace: 'scopes._0',
        fields: [],
    },
]
