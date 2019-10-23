// @flow

import wu from 'wu';

import {invariant, collect, partition} from '../utils';
import type Fund from '../fund';
import type {Type, NumberType} from '../types';

export type SchemaType = 'object' | 'array' | 'boolean' | 'integer' | 'number' | 'string' | 'null';

export type Schema = boolean | {
    id?: string,
    $ref?: string,
    $schema?: string,
    $comment?: string,
    title?: string,
    description?: string,
    default?: mixed,
    multipleOf?: number,
    maximum?: number,
    exclusiveMaximum?: boolean,
    minimum?: number,
    exclusiveMinimum?: boolean,
    maxLength?: number,
    minLength?: number,
    pattern?: string,
    additionalItems?: boolean | Schema,
    items?: Schema | Schema[],
    maxItems?: number,
    minItems?: number,
    uniqueItems?: boolean,
    maxProperties?: number,
    minProperties?: number,
    required?: string[],
    additionalProperties?: boolean | Schema,
    definitions?: {[string]: Schema},
    properties?: {[string]: Schema},
    patternProperties?: {[string]: Schema},
    dependencies?: {[string]: Schema | string[]},
    enum?: mixed[],
    type?: SchemaType | SchemaType[],
    allOf?: Schema[],
    anyOf?: Schema[],
    oneOf?: Schema[],
    not?: Schema,
};

function convert(fund: Fund, type: ?Type): Schema {
    let schema = convertType(fund, type);
    if (type && type.comment) {
        if (schema === true) {
            schema = { $comment: type.comment };
        } else {
            schema.$comment = type.comment;
        }
    }
    return schema;
}

function convertType(fund: Fund, type: ?Type): Schema {
    if (!type) {
        return {
            type: 'null',
        };
    }

    switch (type.kind) {
        case 'record':
            const properties = collect(
                wu(type.fields).map(field => [field.name, convert(fund, field.value)])
            );

            const required = wu(type.fields)
                .filter(field => field.required)
                .pluck('name')
                .toArray();

            return required.length > 0 ? {
                type: 'object',
                properties,
                required,
            } : {
                type: 'object',
                properties,
            };
        case 'array':
            return {
                type: 'array',
                items: convert(fund, type.items),
            };
        case 'tuple':
            return {
                type: 'array',
                items: wu(type.items).map(type => convert(fund, type)).toArray(),
            };
        case 'map':
            // TODO: invariant(type.keys.kind === 'string');
            // TODO: "propertyNames".

            return {
                type: 'object',
                additionalProperties: convert(fund, type.values),
            };
        case 'union':
            const enumerate = wu(type.variants)
                .filter(variant => variant.kind === 'literal' && variant.value !== null)
                .map(literal => (literal: $FlowFixMe).value)
                .tap(value => invariant(value !== undefined))
                .toArray();

            const schemas = wu(type.variants)
                .filter(variant => variant.kind !== 'literal' || variant.value === null)
                .map(variant => convert(fund, variant))
                .toArray();

            if (schemas.length === 0) {
                return {
                    enum: enumerate,
                };
            }

            if (enumerate.length > 0) {
                schemas.push({
                    enum: enumerate,
                });
            }

            return {
                anyOf: schemas,
            };
        case 'intersection':
            const [maps, others] = partition(type.parts, type => type.kind === 'map');

            const parts = wu(others).map(part => convert(fund, part)).toArray();

            if (maps.length > 0) {
                const keys = wu(maps).map(map => convert(fund, (map: $FlowFixMe).values)).toArray();
                const key = keys.length === 1 ? keys[0] : {anyOf: keys};

                if (parts.length === 1 && parts[0].type === 'object') {
                    invariant(typeof parts[0] === 'object');
                    invariant(parts[0].additionalProperties == null);

                    parts[0].additionalProperties = key;
                } else {
                    parts.push({
                        type: 'object',
                        additionalProperties: key,
                    });
                }
            }

            return parts.length === 1 ? parts[0] : {
                allOf: parts,
            };
        case 'maybe':
            return {
                anyOf: [convert(fund, type.value), {type: 'null'}],
            };
        case 'number':
            const {repr} = type;

            return repr === 'f32' || repr === 'f64' ? {type: 'number'}
                 : repr === 'i32' || repr === 'i64' ? {type: 'integer'}
                 : {type: 'integer', minimum: 0};
        case 'string':
            return {
                type: 'string',
            };
        case 'boolean':
            return {
                type: 'boolean',
            };
        case 'literal':
            invariant(type.value !== undefined);

            return type.value === null ? {
                type: 'null',
            } : {
                const: type.value,
            };
        case 'any':
        case 'mixed':
            return true;
        case 'reference':
        default:
            return {
                $ref: `#/definitions/${type.to.join('::')}`,
            };
    }
}

export default function (fund: Fund): Schema {
    const schemas = wu(fund.takeAll()).map(type => {
        invariant(type.id);

        return [type.id.join('::'), convert(fund, type)];
    });

    return {
        $schema: 'http://json-schema.org/draft-06/schema#',
        definitions: collect(schemas),
    };
}
