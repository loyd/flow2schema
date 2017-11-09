type A = string;

type Type = {
    a: A,
    b: A[],
};

interface Interface {
    a: A;
    b: A[];
}

class Class {
    a: A;
    b: A[];
}

export {Type, Interface, Class};
