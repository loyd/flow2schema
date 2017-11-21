import {invariant} from './utils';

// @see flow#3912.
export type Schema =
    | RecordType & Top
    | EnumType & Top
    | ArrayType & Top
    | MapType & Top
    // TODO: support top-level unions.
    //| UnionType & Top
    | FixedType & Top
    | WrappedType & Top;

export type Top = {
    name: string,
    namespace?: string,
    $unwrap?: boolean,
};

export type Type =
    | ComplexType
    | UnionType
    | PrimitiveType
    | ReferenceType;

export type WrappedType = {type: Type};

export type ComplexType =
    | RecordType
    | EnumType
    | ArrayType
    | MapType
    // TODO: unions should be complex types.
    //| UnionType & Top
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
    fields: FieldType[],
};

export type FieldType = {
    name: string,
    type: Type,
};

export type EnumType = {
    type: 'enum',
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

export function isPrimitiveType(type: Type): boolean %checks {
    // Switch operator is not allowed in %checks functions.
    return type === 'null'
        || type === 'int'
        || type === 'long'
        || type === 'float'
        || type === 'double'
        || type === 'bytes'
        || type === 'string'
        || type === 'boolean';
}

export function isComplexType(type: Type): boolean %checks {
    return typeof type !== 'string' && !(type instanceof Array);
}

export function makeFullname(schema: Top): string {
    invariant(schema.namespace != null);

    return `${schema.namespace}.${schema.name}`;
}

export function mergeTypes<+T: ComplexType & {+name?: string}>(types: T[]): [string, ComplexType] {
    invariant(types.length > 1);

    if (types.length === 1) {
        const type = types[0];
        // TODO: anonymous?
        invariant(type.name != null);

        return [type.name, (type: $FlowFixMe)];
    }

    const map = new Map;

    // TODO: overriding?
    let name = '';

    for (const type of types) {
        // TODO: enums?
        invariant(type.type === 'record');

        for (const field of (type: $FlowFixMe).fields) {
            const stored = map.get(field.name);

            if (stored) {
                // TODO: what about enums?
                // TODO: improve checking.
                invariant(stored.type === field.type);
                continue;
            }

            map.set(field.name, field);
        }

        // TODO: anonymous?
        name += '_' + (type.name != null ? type.name : 'unnamed');
    }

    const type = {
        type: 'record',
        fields: Array.from(map.values()),
    };

    return [name, (type: $FlowFixMe)];
}
