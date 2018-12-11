export const obj: {foo: number} = {foo: 42};

type O = {foo: number};

export const obj2: O = {foo: 42};

export const obj3 = obj;

export const num = 42;
export const str = '';
export const nil = null;
export const empty = undefined;
const notExportableAndUseless = {useless: true}

let otherNum = 42;

export const obj4 = {
    num: 42,
    str: 'str',
    'literal-literal': 'literal',
    ['computed']: 'computed',
    42: ++otherNum,
    null: null,
    true: true,
    false: false,
    array: [1, '', true, null],
    seq: (1, '', 42)
}
export const obj5 = {
    obj
}

export const obj6 = {
    ...obj4,
    ...{num: '', str: 42},
    ...{...obj},
}
