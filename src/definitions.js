// flow#5376.
import type {
    ArrayTypeAnnotation, ClassDeclaration, ClassProperty, Comment, FlowTypeAnnotation,
    GenericTypeAnnotation, InterfaceDeclaration, IntersectionTypeAnnotation, TypeAlias,
    UnionTypeAnnotation, NullableTypeAnnotation, ObjectTypeIndexer, ObjectTypeProperty,
    StringLiteralTypeAnnotation,
} from '@babel/types';

import {
    isIdentifier, isObjectTypeProperty, isStringLiteralTypeAnnotation, isClassProperty,
} from '@babel/types';

import Context from './context';

import type {
    Schema, Type, ReferenceType, ComplexType, RecordType, FixedType,
    FieldType, ArrayType, MapType, UnionType, EnumType,
} from './schema';

import {isPrimitiveType, isComplexType, makeFullname, mergeTypes} from './schema';
import {invariant, compose, last, get, negate, partition, map, filter, filterMap, compact} from './utils';

function processTypeAlias(ctx: Context, node: TypeAlias) {
    let type = makeType(ctx, node.right);

    // TODO: support function aliases.
    invariant(type != null);
    // TODO: support top-level unions.
    invariant(!(type instanceof Array));

    if (typeof type === 'string') {
        type = {type: type};
    }

    ctx.define(node.id.name, type);
}

// TODO: type params.
function processInterfaceDeclaration(ctx: Context, node: InterfaceDeclaration) {
    let type = makeType(ctx, node.body);

    invariant(type != null)
    invariant(isComplexType(type));

    if (node.extends.length > 0) {
        const types = [];

        for (const extend of node.extends) {
            const name = extend.id.name;
            const type = ctx.query(name);

            invariant(isComplexType(type));

            types.push((type: $FlowFixMe));
        }

        types.push((type: $FlowFixMe));

        [, type] = mergeTypes(types);
    }

    ctx.define(node.id.name, type);
}

// TODO: type params.
function processClassDeclaration(ctx: Context, node: ClassDeclaration) {
    const props: $FlowFixMe = filter(node.body.body, isClassProperty);

    let type = makeRecord(ctx, props);

    if (node.superClass) {
        // TODO: warning about expressions here.
        invariant(isIdentifier(node.superClass));

        const {name} = node.superClass;
        const superSchema = ctx.query(name);

        invariant(isComplexType(superSchema));

        [, type] = mergeTypes([(superSchema: $FlowFixMe), (type: $FlowFixMe)]);
    }

    ctx.define(node.id.name, type);
}

function makeType(ctx: Context, node: FlowTypeAnnotation): ?Type {
    switch (node.type) {
        case 'NullLiteralTypeAnnotation':
            return 'null';
        case 'BooleanTypeAnnotation':
            return 'boolean';
        case 'NumberTypeAnnotation':
            return 'double';
        case 'StringTypeAnnotation':
            return 'string';
        case 'TypeAnnotation':
            return makeType(ctx, node.typeAnnotation);
        case 'NullableTypeAnnotation':
            return makeNullable(ctx, node);
        case 'ObjectTypeAnnotation':
            const map = makeMap(ctx, node.indexers);
            const record = makeRecord(ctx, node.properties);

            // TODO: warning about this.
            invariant(!map || record.fields.length === 0);

            return map || record;
        case 'ArrayTypeAnnotation':
            return makeArrayType(ctx, node);
        case 'UnionTypeAnnotation':
            return makeUnionType(ctx, node);
        case 'IntersectionTypeAnnotation':
            return makeIntersection(ctx, node);
        case 'StringLiteralTypeAnnotation':
            return makeEnum(node);
        case 'GenericTypeAnnotation':
            return makeReference(ctx, node);
        case 'FunctionTypeAnnotation':
            return null;
        default:
            invariant(false, `Unknown type: ${node.type}`);
    }
}

function makeNullable(ctx: Context, node: NullableTypeAnnotation): ?UnionType {
    const type = makeType(ctx, node.typeAnnotation);

    if (type == null) {
        return null;
    }

    return ['null', type];
}

function makeRecord<T: ObjectTypeProperty | ClassProperty>(ctx: Context, nodes: T[]): RecordType {
    const fields = compact(map(nodes, node => makeField(ctx, node)));

    return {
        type: 'record',
        fields,
    };
}

function makeField(ctx: Context, node: ObjectTypeProperty | ClassProperty): ?FieldType {
    // $FlowFixMe
    if (node.static) {
        return null;
    }

    let type = null;

    if (node.leadingComments) {
        const pragmas = extractPragmas(node.leadingComments);

        type = last(pragmas);
    }

    if (type == null) {
        const value = isObjectTypeProperty(node) ? node.value : node.typeAnnotation;

        // TODO: no type annotation for the class property.
        invariant(value);

        type = makeType(ctx, value);
    }

    if (type == null) {
        return null;
    }

    if (isComplexType(type) && type.type === 'record') {
        const name = (type: $FlowFixMe).name;
        ctx.define(name, type, false);
        type = name;
    }

    // TODO: support optional fields.
    // TODO: warning about computed properties.

    invariant(isObjectTypeProperty(node) || !node.computed);
    invariant(isIdentifier(node.key));

    return {
        name: node.key.name,
        type,
    };
}

function makeMap(ctx: Context, nodes: ObjectTypeIndexer[]): ?MapType {
    if (nodes.length === 0) {
        return null;
    }

    // TODO: what to do in this case?
    invariant(nodes.length === 1);

    const node = nodes[0];

    invariant(makeType(ctx, node.key) === 'string');

    const values = makeType(ctx, node.value);

    if (values == null) {
        return null;
    }

    return {
        type: 'map',
        values,
    };
}

function makeArrayType(ctx: Context, node: ArrayTypeAnnotation): ?ArrayType {
    const items = makeType(ctx, node.elementType);

    if (items == null) {
        return null;
    }

    return {
        type: 'array',
        items,
    };
}

function makeUnionType(ctx: Context, node: UnionTypeAnnotation): ?(UnionType | EnumType) {
    // TODO: flatten variants.
    // TODO: refactor it.

    let [symbols, variants] = partition(node.types, isStringLiteralTypeAnnotation);

    // $FlowFixMe
    symbols = map(symbols, get('value'));
    variants = compact(map(variants, node => makeType(ctx, node)));

    if (symbols.length > 0) {
        const enumeration: EnumType = {
            type: 'enum',
            symbols,
        };

        if (variants.length === 0) {
            return enumeration;
        }

        variants.push(enumeration);
    }

    if (variants.length === 0) {
        return null;
    }

    return variants;
}

function makeIntersection(ctx: Context, node: IntersectionTypeAnnotation): ?Type {
    const types = [];

    // TODO: refactor it.
    for (const typeNode of node.types) {
        const type = makeType(ctx, typeNode);

        if (type == null) {
            continue;
        }

        // TODO: support arbitrary types, not only references.
        invariant(typeof type === 'string');

        const queried = ctx.query(type);

        invariant(isComplexType(queried));

        types.push((queried: $FlowFixMe));
    }

    if (types.length === 0) {
        return null;
    }

    const [name, intersection] = mergeTypes(types);

    // TODO: dirty support for intersections.
    (intersection: $FlowFixMe).name = name;

    return intersection;
}

function makeEnum(node: StringLiteralTypeAnnotation): EnumType {
    return {
        type: 'enum',
        symbols: [node.value],
    };
}

function makeReference(ctx: Context, node: GenericTypeAnnotation): ReferenceType {
    const {name} = node.id;
    const params = node.typeParameters && map(node.typeParameters.params, n => makeType(ctx, n));

    const type = ctx.query(name, params);

    if (typeof type === 'string') {
        return type;
    }

    // TODO: generalized it.
    if ((type: $FlowFixMe).$unwrap) {
        invariant(typeof type.type === 'string');

        return type.type;
    }

    invariant(isComplexType(type));

    if (type.namespace === ctx.namespace) {
        return (type: $FlowFixMe).name;
    }

    return makeFullname((type: $FlowFixMe));
}

function extractPragmas(comments: Comment[]): Type[] {
    return filterMap(comments, compose(get('value'), extractPragma));
}

function extractPragma(text: string): ?Type {
    const marker = '$avro ';

    const value = text.trimLeft();

    if (!value.startsWith(marker)) {
        return null;
    }

    const pragma = value.slice(marker.length).trim();

    return parsePragma(pragma);
}

function parsePragma(pragma: string): Type {
    let [type, arg] = pragma.split(/\s+/);

    if (isPrimitiveType(type)) {
        invariant(arg == null);

        return type;
    }

    if (type === 'fixed') {
        arg = Number(arg);

        invariant(Number.isInteger(arg));

        return ({
            type: 'fixed',
            size: arg,
        }: FixedType);
    }

    invariant(false);
}

export default {
    TypeAlias: processTypeAlias,
    InterfaceDeclaration: processInterfaceDeclaration,
    ClassDeclaration: processClassDeclaration,
}
