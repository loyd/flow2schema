type X = {
    x: string;
    y: boolean;
}

type Y = $Exact<X>;

type Z = $Exact<{z: string}>;

export type {Y, Z};
