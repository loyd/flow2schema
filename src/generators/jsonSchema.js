// @flow

import wu from 'wu';

import {invariant, collect, partition} from '../utils';
import type Fund from '../fund';
import type {Type} from '../types';
import type {Options} from '../options';

export type SchemaType = 'object' | 'array' | 'boolean' | 'integer' | 'number' | 'string' | 'null';

export type Schema = {
    $id?: string,
    $ref?: string,
    $schema?: string,
    title?: string,
    description?: string,
    default?: mixed,
    multipleOf?: number,
    maximum?: number,
    exclusiveMaximum?: number,
    minimum?: number,
    exclusiveMinimum?: number,
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
    enum?: (string | number | Schema)[],
    type?: SchemaType | SchemaType[],
    allOf?: Schema[],
    anyOf?: Schema[],
    oneOf?: Schema[],
    not?: Schema,
    const?: string | number | boolean,
};

function convert(fund: Fund, type: ?Type, options: ?Options): Schema {
    if (!type) {
        return {
            type: 'null',
        };
    }

    const {title, description} = type;

    switch (type.kind) {
        case 'record':
            const properties = collect(
                wu(type.fields).map(field => [field.name, convert(fund, field.value, options)])
            );

            const required = wu(type.fields)
                .filter(field => field.required)
                .pluck('name')
                .toArray();

            //ToDo: support patternProperties
            let {maxProperties, minProperties, propertyNames} = type;
            const additionalProperties = type.additionalProperties && convert(fund, type.additionalProperties, options);

            return required.length > 0 ? {
                type: 'object',
                properties,
                required,
                ...clearType({
                    title,
                    description,
                    maxProperties,
                    minProperties,
                    additionalProperties,
                    propertyNames,
                }),
            } : {
                type: 'object',
                properties,
                ...clearType({
                    title,
                    description,
                    maxProperties,
                    minProperties,
                    additionalProperties,
                    propertyNames,
                }),
            };
        case 'array':
            const {maxItems, minItems, uniqueItems} = type;
            const additionalItems = type.additionalItems && convert(fund, type.additionalItems, options);
            const contains = type.contains && convert(fund, type.contains, options);

            return {
                type: 'array',
                items: convert(fund, type.items, options),
                ...clearType({additionalItems, contains, maxItems, minItems, uniqueItems}),
            };
        case 'tuple':
            return {
                type: 'array',
                items: wu(type.items).map(type => convert(fund, type, options)).toArray(),
            };
        case 'map':
            // TODO: invariant(type.keys.kind === 'string');
            // TODO: "propertyNames".

            return {
                type: 'object',
                additionalProperties: convert(fund, type.values, options),
            };
        case 'union':
            const enumerate = wu(type.variants)
                .filter(variant => variant.kind === 'literal')
                .map(literal => (literal: $FlowFixMe).value)
                .tap(value => invariant(value !== undefined))
                .toArray();

            const schemas = wu(type.variants)
                .filter(variant => variant.kind !== 'literal')
                .map(variant => convert(fund, variant, options))
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

            const parts = wu(others).map(part => convert(fund, part, options)).toArray();

            if (maps.length > 0) {
                const keys = wu(maps).map(map => convert(fund, (map: $FlowFixMe).values, options)).toArray();
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
                anyOf: [convert(fund, type.value, options), {type: 'null'}],
            };
        case 'number':
            let {
                multipleOf,
                maximum,
                exclusiveMaximum,
                minimum,
                exclusiveMinimum
            } = type;

            switch (type.repr) {
                case 'f32':
                case 'f64':
                    return {
                        type: 'number',
                        ...clearType({
                            title,
                            description,
                            multipleOf,
                            maximum,
                            exclusiveMaximum,
                            minimum,
                            exclusiveMinimum,
                        }),
                    };
                case 'i32':
                case 'i64':
                    return {
                        type: 'integer',
                        ...clearType({
                            title,
                            description,
                            multipleOf,
                            maximum,
                            exclusiveMaximum,
                            minimum,
                            exclusiveMinimum,
                        }),
                    };
                default:
                    return {
                        type: 'integer',
                        minimum: 0,
                    };
            }
        case 'string':
            let {maxLength, minLength, pattern, format} = type;

            return {
                type: 'string',
                ...clearType({
                    title,
                    description,
                    maxLength,
                    minLength,
                    pattern,
                    format,
                }),
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
            return {};
        case 'reference':
        default:
            const separator = options && options.referenceSchemaSeparator || '::';

            return {
                $ref: `#/definitions/${type.to.join(separator)}`,
            };
    }
}

const clearType = (type: {[string]: mixed}) => {
    for(let prop in type) {
        if (type.hasOwnProperty(prop) && type[prop] === undefined) {
            delete type[prop];
        }
    }

    return type;
};

export default function (fund: Fund, options: ?Options): Schema {
    const separator = options && options.referenceSchemaSeparator || '::';
    const schemas = wu(fund.takeAll()).map(type => {
        invariant(type.id);

        return [type.id.join(separator), convert(fund, type, options)];
    });

    return {
        $schema: 'http://json-schema.org/draft-07/schema#',
        definitions: collect(schemas),
    };
}
