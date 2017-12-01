type A = {a: number};
type B = {b: string};
type C = {c: boolean};

type X = A & B;

type Y = {
    y: A & B & C,
};

class Z {
    z: A & C;
}

export {X, Y, Z};
