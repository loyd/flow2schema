class Test {
    foo() {
        type X = {
            t: Test,
        };

        // TODO: replace with commonjs.
        export {X};
    }
}

export {Test};
