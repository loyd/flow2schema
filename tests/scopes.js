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

        // TODO: replace with commonjs.
        export {Y as Y2};
    }

    class Test {
        static bar() {
            type X = number;

            type Y = {
                x: X,
                z: Z,
            };

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
