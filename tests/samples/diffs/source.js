type A = {
    x: string,
    y: boolean,
};

type B = {
    y: boolean,
};

type X = $Diff<A, B>;
type Y = $Diff<A, {x: string}>;

export {X, Y};
