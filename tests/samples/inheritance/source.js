class A {
    a: number;
}

class B extends A {
    b: string;
}

class C extends B {
    c: boolean;
}

interface X {
    x: number;
}

interface Y extends X {
    y: string;
}

interface Z extends Y {
    z: boolean;
}

export {C, Z};
