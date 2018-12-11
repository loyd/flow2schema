// @flow

import type {
    Identifier, FlowTypeAnnotation,
    UpdateExpression, UnaryExpression, StringLiteral, SequenceExpression,
    ObjectExpression, NumericLiteral, NullLiteral, NewExpression,
    BooleanLiteral, ArrayExpression, VariableDeclarator,
    ObjectProperty, SpreadProperty, SpreadElement
} from '@babel/types';

import type {
    Type, RecordType, Field, ArrayType, TupleType, MapType, MaybeType
} from '../types';

import {
    Node,
    isUpdateExpression,isUnaryExpression, isStringLiteral, isSequenceExpression,
    isObjectExpression, isNumericLiteral, isNullLiteral, isNewExpression,
    isBooleanLiteral, isArrayExpression, isIdentifier, isTypeAnnotation,
    isObjectProperty, isSpreadProperty, isSpreadElement
} from '@babel/types';

import * as t from '../types';
import {invariant, uniqLastBy} from '../utils';
import Context from './context';
import {makeType as makeTypeFromTypeAnnotation} from './definitions';

// TODO MetaProperty, MemberExpression, LogicalExpression, FunctionExpression,
// ConditionalExpression, CallExpression, ArrowFunctionExpression
type AvailableExpression =
    UpdateExpression |  UnaryExpression |  StringLiteral |  SequenceExpression |
    ObjectExpression |  NumericLiteral |  NullLiteral |  NewExpression |
    BooleanLiteral |  ArrayExpression | Identifier;

function processVariableDeclarator (ctx: Context, node: VariableDeclarator) {
    const {id, init} = node;

    if (!isIdentifier(id)) {
        return;
    }

    if (isTypeAnnotation(id.typeAnnotation)) {
        processTypeFromTypeAnnotation(ctx, id)
    } else if (isAvailableValueExpression(init)) {
        processTypeFromInit(ctx, id, init);
    }
}

function processTypeFromTypeAnnotation(ctx: Context, id: Identifier) {
    invariant(id.typeAnnotation);

    const {name, typeAnnotation} = id;
    const type = makeTypeFromTypeAnnotation(ctx, typeAnnotation);

    // TODO: support function variables.
    invariant(type);

    ctx.define(name, type);
}

function isAvailableValueExpression(value: Node): boolean %checks {
    return isUpdateExpression(value) || isUnaryExpression(value) || isStringLiteral(value) || isSequenceExpression(value) ||
        isObjectExpression(value) || isNumericLiteral(value) || isNullLiteral(value) || isNewExpression(value) ||
        isBooleanLiteral(value) || isArrayExpression(value) || isIdentifier(value);
}

function processTypeFromInit(ctx: Context, id: Identifier, init: AvailableExpression) {
    const type = makeTypeFromValue(ctx, init);
    invariant(type);
    ctx.define(id.name, type);
}

function makeTypeFromValue(ctx: Context, node: AvailableExpression) {
    switch (node.type) {
        // case init === null;
        case 'Identifier':
            if (node.name === 'undefined') {
                // TODO Fails in json generator
                // type = t.createLiteral(undefined);
                return t.createAny();
            } else {
                return makeReference(ctx, node.name);
            }
        case 'BooleanLiteral':
            return t.createBoolean();
        case 'StringLiteral':
            return t.createString();
        case 'NumericLiteral':
        case 'UpdateExpression':
            return t.createNumber('f64');
        case 'NullLiteral':
            return t.createLiteral(null);
        case 'ObjectExpression':
            return createTypeFromObjectExpression(ctx, node);
        case 'ArrayExpression':
            return createTypeFromArrayExpression(ctx, node);
        case 'SequenceExpression':
            return createTypeFromSequenceExpression(ctx, node);
        // TODO
        case 'UnaryExpression':
        case 'NewExpression':
        default:
            return t.createAny();
    }
}

function createTypeFromObjectExpression(ctx: Context, value: ObjectExpression): ?RecordType {
    const {properties} = value;

    const fields = properties
        .reduce((acc, prop) => {
            if (isObjectProperty(prop)) {
                acc.push(makeFieldFromObjectProperty(ctx, prop));

                return acc;
            }

            if (isSpreadElement(prop) || isSpreadProperty(prop)) {
                acc.push(...obtainFieldsFromSpreadProperty(ctx, prop));

                return acc;
            }

            return acc;
        }, [])
        .filter(Boolean);

    return t.createRecord(uniqLastBy(fields, f => f.name))
}

function makeFieldFromObjectProperty(ctx: Context, node: ObjectProperty): ?Field {
    if (!(isStringLiteral(node.key) || isIdentifier(node.key) || isNumericLiteral(node.key))) {
        return null;
    }

    const name = isIdentifier(node.key) ? node.key.name : String(node.key.value);
    const value = isAvailableValueExpression(node.value) ? makeTypeFromValue(ctx, node.value) : null;

    if (!value) {
        return null;
    }

    return {
        name,
        value,
        required: true
    };
}

function obtainFieldsFromSpreadProperty(ctx: Context, node: SpreadProperty | SpreadElement): Field[] {
    if (isObjectExpression(node.argument)) {
        const type = createTypeFromObjectExpression(ctx, node.argument);

        return type ? type.fields : [];
    }

    if (isIdentifier(node.argument)) {
        const type = ctx.query(node.argument.name);
        invariant(type);

        // TODO: ArrayExpression
        if (type.kind !== 'record') {
            return [];
        }

        // TODO improve typing of t.clone
        // flowlint-next-line unclear-type:off
        return ((t.clone(type): any): RecordType).fields;
    }

    // TODO: ArrayExpression, SequenceExpression
    return [];
}

function createTypeFromArrayExpression(ctx: Context, node: ArrayExpression): ArrayType {
    const types: Type[] = node.elements.map(element => {
        if (!isAvailableValueExpression(element)) {
            return null;
        }

        return makeTypeFromValue(ctx, element);
    }).filter(Boolean);

    return t.createArray(t.createUnion(types));
}

function createTypeFromSequenceExpression(ctx: Context, node: SequenceExpression): ?Type {
    const {expressions} = node;

    if (!Array.isArray(expressions) || !expressions.length) {
        return null;
    }

    const last = expressions[expressions.length - 1];

    return isAvailableValueExpression(last) ? makeTypeFromValue(ctx, last) : null;
}

function makeReference(ctx: Context, name: string): ?Type {
    const type = ctx.query(name);

    if (!type) {
        return null;
    }

    if (!type.id) {
        return t.clone(type);
    }

    return t.createReference(t.clone(type.id));
}

export default {
    VariableDeclarator: processVariableDeclarator,
}
