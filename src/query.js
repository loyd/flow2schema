import type {Node} from '@babel/types';

import type Scope from './scope';
import type {Type} from './types';

export type Query =
    | Unknown
    | Declaration
    | Template
    | Definition
    | External
    | Special;

export type Unknown = {
    kind: 'unknown',
};

export type Declaration = {
    kind: 'declaration',
    name: string,
    node: Node,
    scope: Scope,
};

export type Template = {
    kind: 'template',
    name: string,
    params: TemplateParam[],
    instances: Instance[],
    node: Node,
    scope: Scope,
};

export type Definition = {
    kind: 'definition',
    type: Type,
    scope: Scope,
};

export type External = {
    kind: 'external',
    info: ExternalInfo,
    scope: Scope,
};

export type Special = {
    kind: 'special',
    call: SpecialFn,
};

export type SpecialFn = (?Type)[] => ?Type;

export type TemplateParam = {
    name: string,
    value: ?Type,
};

export type Instance = {
    params: (?Type)[],
    type: Type,
};

export type ExternalInfo = {
    local: string,
    imported: ?string,
    path: string,
};
