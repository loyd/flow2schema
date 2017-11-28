type A<T, K> = {
    t: T,
    k: K,
};

type X = {
    a: A<string, boolean>,
};

type Y = {
    a: A<number, X>,
}

export {X, Y};
