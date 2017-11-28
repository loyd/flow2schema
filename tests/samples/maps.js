type Type = {
    [string]: boolean,
};

interface Interface {
    [string]: boolean;
}

type Couple = {
    [string]: boolean,
    [number]: string,
};

type Mix = {
    [string]: boolean,

    foo: string,
}

export {Type, Interface, Couple, Mix};
