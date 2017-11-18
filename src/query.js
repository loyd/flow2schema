import type {Node} from '@babel/types';

import type Scope from './scope';
import type {Schema} from './schema';

export type Query =
    | Unknown
    | Declaration
    | Template
    | Definition
    | External;

export type Unknown = {
    type: 'unknown',
};

export type Declaration = {
    type: 'declaration',
    name: string,
    node: Node,
    scope: Scope,
};

export type Template = {
    type: 'template',
    name: string,
    params: TemplateParam[],
    instances: Instance[],
    node: Node,
    scope: Scope,
};

export type Definition = {
    type: 'definition',
    schema: Schema,
    scope: Scope,
};

export type External = {
    type: 'external',
    info: ExternalInfo,
    scope: Scope,
};

export type TemplateParam = {
    name: string,
    default: Schema,
};

export type Instance = {
    params: Schema[],
    schema: Schema,
};

export type ExternalInfo = {
    local: string,
    imported: ?string,
    path: string,
};
