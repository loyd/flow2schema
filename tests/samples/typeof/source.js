const object: {
    foo: number,
    bar: string,
    baz?: boolean
} = {foo: 42, bar: ''}

export type TypeOfObject = typeof object;

type A = {
    foo: number,
    bar: string,
    baz?: boolean
};

const object2: A = {foo: 42, bar: ''}

export type TypeOfObject2 = typeof object2;
