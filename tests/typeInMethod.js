class Test {
    foo() {
        type X = {
            t: Test,
        };
    }
}

// ###
[
    {
        type: 'record',
        name: 'Test',
        namespace: 'typeInMethod',
        fields: [],
    },
    {
        type: 'record',
        name: 'X',
        namespace: 'typeInMethod._0',
        fields: [{name: 't', type: 'typeInMethod.Test'}],
    },
]
