type X = {
    x: Buffer,
};

(function () {
    interface Buffer {}

    type Y = {
        y: Buffer,
    };

    // TODO: replace with commonjs.
    export {Y};
})();

export {X};
