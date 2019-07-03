type Base = {
    foo: string,
    bar: boolean,
};

type Type = {
    ...Base,
    baz: number,
    bim: string,
};

export {Type};
