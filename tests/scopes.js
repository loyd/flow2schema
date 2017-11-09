type X = string;

type Y = {
    x: X,
};

(function () {
    type Y = {
        x: X,
    };

    type Z = string;

    type X = number;

    function foo() {
        type Y = {
            x: X,
            z: Z,
        };

        type X = boolean;

        // TODO: replace with commonjs.
        export {Y as Y2};
    }

    class Test {
        static bar() {
            type Y = {
                x: X,
                z: Z,
            };

            type X = number;

            export {Y as Y3};
        }

        baz() {
            type X = string;

            type Y = {
                x: X,
                z: Z,
            };

            export {Y as Y4};
        }
    }

    export {Y as Y1};
})();

export {Y as Y0};
