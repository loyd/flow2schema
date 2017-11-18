// @see flow#3912.
export type Schema =
    | RecordType & Top
    | EnumType & Top
    | ArrayType & Top
    | MapType & Top
    | UnionType & Top
    | FixedType & Top
    | WrappedType & Top;

export type Top = {
    name: string,
    namespace?: string,
    $unwrap?: boolean,
};

export type Type =
    | ComplexType
    | PrimitiveType
    | ReferenceType;

export type WrappedType = {type: Type};

export type ComplexType =
    | RecordType
    | EnumType
    | ArrayType
    | MapType
    | UnionType
    | FixedType
    | WrappedType;

export type PrimitiveType =
    | 'null'
    | 'boolean'
    | 'int'
    | 'long'
    | 'float'
    | 'double'
    | 'bytes'
    | 'string';

export type ReferenceType = string;

export type RecordType = {
    type: 'record',
    name: string,
    fields: FieldType[],
};

export type FieldType = {
    name: string,
    type: Type,
};

export type EnumType = {
    type: 'enum',
    name: string,
    symbols: string[],
};

export type ArrayType = {
    type: 'array',
    items: Type,
};

export type MapType = {
    type: 'map',
    values: Type,
};

export type UnionType = Type[];

export type FixedType = {
    type: 'fixed',
    size: number,
};
