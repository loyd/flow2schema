type X = {
    a: string,
    b: boolean,
};

type Y = $Values<X>;

export {Y};
