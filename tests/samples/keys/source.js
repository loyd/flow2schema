type X = {
    a: string,
    b: boolean,
};

type Y = $Keys<X>;

type Z = $Keys<{
    a: string,
    b: boolean,
}>;

export {Y, Z};
