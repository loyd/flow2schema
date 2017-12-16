import wu from 'wu';

import {invariant, collect} from '../utils';
import type Fund from '../fund';
import type {Type, NumberType} from '../types';

export type SchemaType = 'object' | 'array' | 'boolean' | 'integer' | 'number' | 'string' | 'null';

export type Schema = {
    id?: string,
    $ref?: string,
    $schema?: string,
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

            const schema: Schema = {
                type: 'object',
                properties,
            };

            if (required.length > 0) {
                schema.required = required;
            }

            return schema;
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

            return {
                type: 'object',
                additionalProperties: convert(fund, type.values),
            };
        case 'union':
            const enumerate = wu(type.variants)
                .filter(variant => variant.kind === 'literal')
                .map(literal => (literal: $FlowFixMe).value)
                .tap(value => invariant(value !== undefined))
                .toArray();

            const schemas = wu(type.variants)
                .filter(variant => variant.kind !== 'literal')
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
            return {
                allOf: wu(type.parts).map(part => convert(fund, part)).toArray(),
            };
        case 'maybe':
            return {
                oneOf: [convert(fund, type.value), {type: 'null'}],
            };
        case 'number':
            return {
                type: type.repr === 'f32' || type.repr === 'f64' ? 'number' : 'integer',
            };
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
                enum: [type.value],
            };
        case 'any':
        case 'mixed':
            return {};
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
        definitions: collect(schemas),
    };
}
