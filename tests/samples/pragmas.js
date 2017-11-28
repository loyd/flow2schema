type Type = {
    // @repr {i32}
    a: number,
    /* @repr {i64} */
    b: number,
    //   @repr   {f32}
    c: number,
    // @repr {f64}
    d: number,
};

interface Interface {
    // @repr {i32}
    a: number;
    /* @repr {i64} */
    b: number;
    //   @repr   {f32}
    c: number;
    // @repr {f64}
    d: number;

    // Some comment.
    e: string;
}

class Class {
    // @repr {i32}
    a: number;
    /* @repr {i64} */
    b: number;
    //   @repr   {f32}
    c: number;
    // @repr {f64}
    d: number;
}

export {Type, Interface, Class};
