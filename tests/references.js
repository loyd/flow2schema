type A = string;

type Type = {
    a: A,
    b: A[],
    c: A<number>,
};

interface Interface {
    a: A;
    b: A[];
    c: A<number>;
}

class Class {
    a: A;
    b: A[];
    c: A<number>;
}
