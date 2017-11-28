export type Type =
    | RecordType
    | ArrayType
    | TupleType
    | MapType
    | UnionType
    | IntersectionType
    | MaybeType
    | NumberType
    | StringType
    | BooleanType
    | LiteralType
    | AnyType
    | MixedType
    | ReferenceType;

export type TypeId = string[];

export type BaseType = {
    id?: TypeId,
};

export type RecordType = BaseType & {
    kind: 'record',
    fields: Field[],
};

export type Field = {
    name: string,
    value: Type,
    required: boolean,
};

export type ArrayType = BaseType & {
    kind: 'array',
    items: Type,
};

export type TupleType = BaseType & {
    kind: 'tuple',
    items: (?Type)[],
};

export type MapType = BaseType & {
    kind: 'map',
    keys: Type,
    values: Type,
};

export type UnionType = BaseType & {
    kind: 'union',
    variants: Type[],
};

export type IntersectionType = BaseType & {
    kind: 'intersection',
    parts: Type[],
}

export type MaybeType = BaseType & {
    kind: 'maybe',
    value: Type,
};

export type NumberType = BaseType & {
    kind: 'number',
    repr: 'i32' | 'i64' | 'u32' | 'u64' | 'f32' | 'f64',
};

export type StringType = BaseType & {
    kind: 'string',
};

export type BooleanType = BaseType & {
    kind: 'boolean',
};

export type LiteralType = BaseType & {
    kind: 'literal',
    value: string | number | boolean | null | void,
};

export type AnyType = BaseType & {
    kind: 'any',
};

export type MixedType = BaseType & {
    kind: 'mixed',
};

export type ReferenceType = BaseType & {
    kind: 'reference',
    to: TypeId,
};
