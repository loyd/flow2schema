type A = {a: number};
type B = {b: string};
type C = {c: boolean};

type X = $All<A, B>;

type Y = {
    y: $All<A, B, C>,
    yy: $All<() => boolean, () => string>,
};

class Z {
    z: $All<A, () => void>;
}

export {X, Y, Z};
