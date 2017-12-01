export type A = {
    a: boolean,
};

class B {
    b: string;
}

interface CC {
    c: number;
}

class D {
    d: number;
}

export {B, CC as C, D as default};
