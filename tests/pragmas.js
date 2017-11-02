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

// ###
[
    {
        type: 'record',
        name: 'Type',
        fields: [
            {name: 'a', type: 'int'},
            {name: 'b', type: 'long'},
            {name: 'c', type: 'float'},
            {name: 'd', type: 'double'},
            {name: 'e', type: {type: 'fixed', size: 10}},
        ],
    },
    {
        type: 'record',
        name: 'Interface',
        fields: [
            {name: 'a', type: 'int'},
            {name: 'b', type: 'long'},
            {name: 'c', type: 'float'},
            {name: 'd', type: 'double'},
            {name: 'e', type: {type: 'fixed', size: 10}},
        ],
    },
    {
        type: 'record',
        name: 'Class',
        fields: [
            {name: 'a', type: 'int'},
            {name: 'b', type: 'long'},
            {name: 'c', type: 'float'},
            {name: 'd', type: 'double'},
            {name: 'e', type: {type: 'fixed', size: 10}},
        ],
    },
]
