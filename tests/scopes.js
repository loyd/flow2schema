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
