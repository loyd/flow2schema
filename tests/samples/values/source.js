type X = {
    a: string,
    b: boolean,
};

type Y = $Values<X>;

type Z = $Values<{
    a: string,
    b: boolean,
}>;

const u = {a: '', b: 42};
type U = $Values<typeof u>

export {Y, Z, U};
