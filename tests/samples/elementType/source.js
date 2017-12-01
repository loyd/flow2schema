type X<T> = {
    x: T | string,
};

type Y<T> = {
    y: $ElementType<X<boolean>, T>,
};

type Z = $PropertyType<Y<'x'>, 'y'>;

export {Z};
