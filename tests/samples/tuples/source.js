type Type = {
    a: [string, boolean],
};

interface Interface {
    a: [string, null, boolean];
    b: [string, () => void, boolean];
}

class Class {
    a: [boolean];
    b: [];
}

export {Type, Interface, Class};
