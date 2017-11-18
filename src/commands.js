import type {Node} from '@babel/types';

import type {Schema} from './schema';
import type {TemplateParam, ExternalInfo} from './query';

export type Command =
    | {kind: 'declare', name: string, node: Node, params: TemplateParam[]}
    | {kind: 'define', schema: Schema, declared: boolean}
    | {kind: 'external', external: ExternalInfo}
    | {kind: 'provide', name: string, reference: string}
    | {kind: 'query', name: string, params: Schema[]}
    | {kind: 'enter'}
    | {kind: 'exit'}
    | {kind: 'namespace'};

export function declare(name: string, node: Node, params: ?TemplateParam[]): Command {
    return {
        kind: 'declare',
        name,
        node,
        params: params || [],
    };
}

export function define(schema: Schema, declared: boolean = true): Command {
    return {
        kind: 'define',
        schema,
        declared,
    };
}

export function external(external: ExternalInfo): Command {
    return {
        kind: 'external',
        external,
    };
}

export function provide(name: string, reference: string = name): Command {
    return {
        kind: 'provide',
        name,
        reference,
    };
}

export function query(name: string, params: ?Schema[]): Command {
    return {
        kind: 'query',
        name,
        params: params || [],
    };
}

export function enter(): Command {
    return {kind: 'enter'};
}

export function exit(): Command {
    return {kind: 'exit'};
}

export function namespace(): Command {
    return {kind: 'namespace'};
}
