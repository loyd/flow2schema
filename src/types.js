// @flow

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
    | ReferenceType
    ;

export type TypeId = string[];

export type BaseType = {
    id?: TypeId,
    comment?: string,
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
    repr: Repr,
};

export type Repr = 'i32' | 'i64' | 'u32' | 'u64' | 'f32' | 'f64';

export type StringType = BaseType & {
    kind: 'string',
};

export type BooleanType = BaseType & {
    kind: 'boolean',
};

export type LiteralType = BaseType & {
    kind: 'literal',
    value: LiteralValue,
};

export type LiteralValue = string | number | boolean | null | void;

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

export const createRecord = (fields: Field[]): RecordType => ({kind: 'record', fields});
export const createArray = (items: Type): ArrayType => ({kind: 'array', items});
export const createTuple = (items: Array<?Type>): TupleType => ({kind: 'tuple', items});
export const createMap = (keys: Type, values: Type): MapType => ({kind: 'map', keys, values});
export const createUnion = (variants: Type[]): UnionType => ({kind: 'union', variants});
export const createIntersection = (parts: Type[]): IntersectionType => ({kind: 'intersection', parts});
export const createMaybe = (value: Type): MaybeType => ({kind: 'maybe', value});
export const createNumber = (repr: Repr): NumberType => ({kind: 'number', repr});
export const createString = (): StringType => ({kind: 'string'});
export const createBoolean = (): BooleanType => ({kind: 'boolean'});
export const createLiteral = (value: LiteralValue): LiteralType => ({kind: 'literal', value});
export const createAny = () => ({kind: 'any'});
export const createMixed = () => ({kind: 'mixed'});
export const createReference = (to: TypeId) => ({kind: 'reference', to});

declare function clone(Type): Type;
declare function clone(TypeId): TypeId;
declare function clone(?Type): ?Type;
export function clone(type: ?Type | TypeId): ?Type | TypeId {
    if (!type) {
        return null;
    }

    if (type instanceof Array) {
        return type.slice();
    }

    return cloneType(type);
}

function cloneType(type: Type): Type {
    switch (type.kind) {
        case 'record':
            const fields = type.fields.map(field => ({
                name: field.name,
                value: clone(field.value),
                required: field.required,
            }));

            return createRecord(fields);
        case 'array':
            return createArray(clone(type.items));
        case 'tuple':
            return createTuple(type.items.map(clone));
        case 'map':
            return createMap(clone(type.keys), clone(type.values));
        case 'union':
            return createUnion(type.variants.map(clone));
        case 'intersection':
            return createIntersection(type.parts.map(clone));
        case 'maybe':
            return createMaybe(clone(type.value));
        case 'number':
            return createNumber(type.repr);
        case 'string':
            return createString();
        case 'boolean':
            return createBoolean();
        case 'literal':
            return createLiteral(type.value);
        case 'any':
            return createAny();
        case 'mixed':
            return createMixed();
        case 'reference':
        default:
            return createReference(type.to.slice());
    }
}

export function isRepr(v: string): boolean %checks {
    return v === 'i32' || v === 'i64' || v === 'u32' || v === 'u64' || v === 'f32' || v === 'f64';
}
