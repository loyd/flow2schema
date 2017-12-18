type Type = {
    // @repr {i32}
    a: number,
    /* @repr {i64} */
    b: number,
    //   @repr   {f32}
    c: number,
    // @repr {f64}
    d: number,
    // @repr {u32}
    e: number,
    // @repr {u64}
    f: number,
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
    // @repr {u32}
    e: number;
    // @repr {u64}
    f: number;

    // Some comment.
    g: string;
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
    // @repr {u32}
    e: number;
    // @repr {u64}
    f: number;
}

export {Type, Interface, Class};
