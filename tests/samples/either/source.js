type Type = {
    a: $Either<string, boolean>,
};

interface Interface {
    a: $Either<string, boolean, number>;
    aa: $Either<() => number, () => boolean>;
}

class Class {
    a: $Either<string, () => void>;
}

export {Type, Interface, Class};
