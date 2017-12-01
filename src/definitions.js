import wu from 'wu';

// @see flow#5376.
import type {
    ArrayTypeAnnotation, ClassDeclaration, ClassProperty, Comment, FlowTypeAnnotation,
    GenericTypeAnnotation, InterfaceDeclaration, IntersectionTypeAnnotation, TypeAlias,
    UnionTypeAnnotation, NullableTypeAnnotation, ObjectTypeIndexer, ObjectTypeProperty,
    StringLiteralTypeAnnotation, ObjectTypeAnnotation, AnyTypeAnnotation, MixedTypeAnnotation,
    TupleTypeAnnotation,
} from '@babel/types';

import {
    isIdentifier, isObjectTypeProperty, isStringLiteralTypeAnnotation, isClassProperty,
} from '@babel/types';

import Context from './context';

import type {
    Type, RecordType, Field, ArrayType, TupleType, MapType, UnionType, IntersectionType,
    MaybeType, NumberType, StringType, BooleanType, LiteralType, ReferenceType,
} from './types';

import * as t from './types';

import {extractPragmas} from './pragmas';

import {invariant} from './utils';

function processTypeAlias(ctx: Context, node: TypeAlias) {
    const {name} = node.id;
    const type = makeType(ctx, node.right);

    // TODO: support function aliases.
    invariant(type);

    ctx.define(name, type);
}

// TODO: type params.
function processInterfaceDeclaration(ctx: Context, node: InterfaceDeclaration) {
    const {name} = node.id;
    const type = makeType(ctx, node.body);

    invariant(type);

    if (node.extends.length === 0) {
        ctx.define(name, type);
        return;
    }

    const parts = [];

    for (const extend of node.extends) {
        const {name} = extend.id;
        const type = ctx.query(name);

        invariant(type.id);

        const reference = t.createReference(t.clone(type.id));

        parts.push(reference);
    }

    parts.push(type);

    const intersection = t.createIntersection(parts);

    ctx.define(name, intersection);
}

// TODO: type params.
function processClassDeclaration(ctx: Context, node: ClassDeclaration) {
    const props: $FlowFixMe = wu(node.body.body).filter(isClassProperty).toArray();

    const {name} = node.id;
    const type = makeRecord(ctx, props);

    if (!node.superClass) {
        ctx.define(name, type);
        return;
    }

    // TODO: warning about expressions here.
    invariant(isIdentifier(node.superClass));

    const base = ctx.query(node.superClass.name);

    invariant(base.id);

    const baseRef = t.createReference(t.clone(base.id));
    const intersection = t.createIntersection([baseRef, type]);

    ctx.define(name, intersection);
}

function makeType(ctx: Context, node: FlowTypeAnnotation): ?Type {
    switch (node.type) {
        case 'NullLiteralTypeAnnotation':
            return t.createLiteral(null);
        case 'BooleanTypeAnnotation':
            return t.createBoolean();
        case 'NumberTypeAnnotation':
            return t.createNumber('f64');
        case 'StringTypeAnnotation':
            return t.createString();
        case 'TypeAnnotation':
            return makeType(ctx, node.typeAnnotation);
        case 'NullableTypeAnnotation':
            return makeMaybe(ctx, node);
        case 'ObjectTypeAnnotation':
            return makeComplexType(ctx, node);
        case 'ArrayTypeAnnotation':
            return makeArrayType(ctx, node);
        case 'TupleTypeAnnotation':
            return makeTupleType(ctx, node);
        case 'UnionTypeAnnotation':
            return makeUnionType(ctx, node);
        case 'IntersectionTypeAnnotation':
            return makeIntersection(ctx, node);
        case 'StringLiteralTypeAnnotation':
            return t.createLiteral(node.value);
        case 'GenericTypeAnnotation':
            return makeReference(ctx, node);
        case 'AnyTypeAnnotation':
            return t.createAny();
        case 'MixedTypeAnnotation':
            return t.createMixed();
        case 'FunctionTypeAnnotation':
            return null;
        default:
            invariant(false, `Unknown node: ${node.type}`);
    }
}

function makeMaybe(ctx: Context, node: NullableTypeAnnotation): ?MaybeType {
    const type = makeType(ctx, node.typeAnnotation);

    if (!type) {
        return null;
    }

    return t.createMaybe(type);
}

function makeComplexType(ctx: Context, node: ObjectTypeAnnotation): Type {
    const maps = wu(node.indexers)
        .map(node => makeMap(ctx, node))
        .filter()
        .toArray();

    const record = makeRecord(ctx, node.properties);

    if (maps.length === 1 && record.fields.length === 0) {
        return maps[0];
    }

    if (maps.length === 0) {
        return record;
    }

    const parts = record.fields.length > 0 ? [record, ...maps] : maps;

    return t.createIntersection(parts);
}

function makeRecord<T: ObjectTypeProperty | ClassProperty>(ctx: Context, nodes: T[]): RecordType {
    const fields = wu(nodes)
        .map(node => makeField(ctx, node))
        .filter()
        .toArray();

    return t.createRecord(fields);
}

function makeField(ctx: Context, node: ObjectTypeProperty | ClassProperty): ?Field {
    if ((node: $FlowIssue<3129>).static) {
        return null;
    }

    let type = null;

    if (node.leadingComments) {
        const pragma = (wu: $FlowIssue<4431>)(node.leadingComments)
            .pluck('value')
            .map(extractPragmas)
            .flatten()
            .find(pragma => pragma.kind === 'type');

        if (pragma) {
            type = pragma.value;
        }
    }

    if (!type) {
        const value = isObjectTypeProperty(node) ? node.value : node.typeAnnotation;

        // TODO: no type annotation for the class property.
        invariant(value);

        type = makeType(ctx, value);
    }

    if (!type) {
        return null;
    }

    // TODO: warning about computed properties.

    invariant(isObjectTypeProperty(node) || !node.computed);
    invariant(isIdentifier(node.key));

    return {
        name: node.key.name,
        value: type,
        required: node.optional == null || !node.optional,
    };
}

function makeMap(ctx: Context, node: ObjectTypeIndexer): ?MapType {
    const keys = makeType(ctx, node.key);
    const values = makeType(ctx, node.value);

    if (!(keys && values)) {
        return null;
    }

    return t.createMap(keys, values);
}

function makeArrayType(ctx: Context, node: ArrayTypeAnnotation): ?ArrayType {
    const items = makeType(ctx, node.elementType);

    if (!items) {
        return null;
    }

    return t.createArray(items);
}

function makeTupleType(ctx: Context, node: TupleTypeAnnotation): ?TupleType {
    // TODO: warning about nulls.
    const items = wu(node.types).map(node => makeType(ctx, node)).toArray();

    if (items.length === 0 || !wu(items).some()) {
        return null;
    }

    return t.createTuple(items);
}

function makeUnionType(ctx: Context, node: UnionTypeAnnotation): ?Type {
    const variants = wu(node.types)
        .map(node => makeType(ctx, node))
        .filter()
        .toArray();

    if (variants.length === 0) {
        return null;
    }

    if (variants.length === 1) {
        return variants[0];
    }

    return t.createUnion(variants);
}

function makeIntersection(ctx: Context, node: IntersectionTypeAnnotation): ?Type {
    // TODO: warning about nulls.
    const parts = wu(node.types)
        .map(node => makeType(ctx, node))
        .filter()
        .toArray();

    if (parts.length === 0) {
        return null;
    }

    if (parts.length === 1) {
        return parts[0];
    }

    return t.createIntersection(parts);
}

function makeReference(ctx: Context, node: GenericTypeAnnotation): ?Type {
    const {name} = node.id;
    const params = node.typeParameters
        && wu(node.typeParameters.params).map(n => makeType(ctx, n)).toArray();

    const type = ctx.query(name, params);

    if (!type.id) {
        return type;
    }

    return t.createReference(t.clone(type.id));
}

export default {
    TypeAlias: processTypeAlias,
    InterfaceDeclaration: processInterfaceDeclaration,
    ClassDeclaration: processClassDeclaration,
}
