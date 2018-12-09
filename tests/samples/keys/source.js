type X = {
    a: string,
    b: boolean,
};

type Y = $Keys<X>;

type Z = $Keys<{
    a: string,
    b: boolean,
}>;

const u = {a: '', b: 42};
type U = $Keys<typeof u>

export {Y, Z, U};
