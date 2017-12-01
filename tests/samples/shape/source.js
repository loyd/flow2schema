type X = {
    x: string;
    y: boolean;
}

type Y = $Shape<X>;

export type {Y};
