type X = {
    x: Buffer,
};

(function () {
    interface Buffer {}

    type Y = {
        y: Buffer,
    };
})();
