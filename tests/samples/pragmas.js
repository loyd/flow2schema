type Type = {
    // $avro int
    a: number,
    /* $avro long */
    b: number,
    //   $avro   float
    c: number,
    // $avro double
    d: number,
    /*   $avro   fixed       10   */
    e: Buffer,
};

interface Interface {
    // $avro int
    a: number;
    /* $avro long */
    b: number;
    //   $avro   float
    c: number;
    // $avro double
    d: number;
    /*   $avro   fixed       10   */
    e: Buffer;
}

class Class {
    // $avro int
    a: number;
    /* $avro long */
    b: number;
    //   $avro   float
    c: number;
    // $avro double
    d: number;
    /*   $avro   fixed       10   */
    e: Buffer;
}

export {Type, Interface, Class};
