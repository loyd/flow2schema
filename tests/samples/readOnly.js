type X = {
    x: string;
    y: boolean;
}

type Y = $ReadOnly<X>;

type Z = $ReadOnly<{z: string}>;

export type {Y, Z};
