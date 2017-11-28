type A<T, K> = {
    t: T,
    k: K,
};

type X = {
    a: A<string, boolean>,
};

export {X};
