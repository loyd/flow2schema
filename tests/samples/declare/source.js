declare type Type = {
    a: string,
};

declare interface Interface {
    a: Type;
};

declare class Class {
    a: Interface;
}

export {Type, Interface, Class};
