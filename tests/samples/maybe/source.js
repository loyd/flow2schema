type X = {
    x: ?string,
    xx: ?string[],
    xxx: (?string)[],
};

interface Y {
    y: ?string;
    yy: ?string[];
    yyy: (?string)[];
}

class Z {
    z: ?string;
    zz: ?string[];
    zzz: (?string)[];
}

export {X, Y, Z};
