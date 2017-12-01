type X = {
    a: string,
    b: boolean,
};

type Y = $Keys<X>;

export {Y};
