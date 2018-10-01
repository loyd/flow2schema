type A = {
    a: 'string',
};

type B = $$extDef<number, {
    minimum: 0,
}>;

type C = $$extDef<B[], {
    uniqueItems: true,
}>

type X = {
    a: $$extDef<A[], {
        additionalItems: {
            a: A,
        },
        contains: B,
        maxItems: 10,
        minItems: 1,
        uniqueItems: false,
    }>,

    b: C,

    c: $$extDef<string, {
        maxLength: 1,
        minLength: 1,
        pattern: '/[a-z]+/i',
        format: 'email',
    }>,

    d: $$extDef<number, {
        multipleOf: 1,
        maximum: 10,
        exclusiveMaximum: 10,
        minimum: 1,
        exclusiveMinimum: 1,
    }>,

    e: $$extDef<A, {
        minProperties: 1,
        maxProperties: 2,
        additionalProperties: A,
        propertyNames: A,
    }>,

    f: $$extDef<string[], {
        minProperties: 1,
        maxProperties: 2,
    }>,

    g: $$extDef<$$extDef<{a: 'string'}, {maxProperties: 1}>[], {uniqueItems: false}>,
};

export type {X};
