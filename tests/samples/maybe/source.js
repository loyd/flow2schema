type X = {
    x: ?string,
    xx: ?(?string),
};

interface Y {
    y: ?string[];
    yy: ?(?(?string));
}

class Z {
    z: (?string)[];
}

export {X, Y, Z};
