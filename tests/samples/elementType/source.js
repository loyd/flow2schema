type X<T> = {
    x: T | string,
};

type P = 'x';

type Y<T> = {
    y: $ElementType<X<boolean>, T>,
    yy: $ElementType<X<boolean>, P>,
};

type Z = $PropertyType<Y<'x'>, 'y'>;

export {Z};
