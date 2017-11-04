import D, {A, B as F} from './externals/first';
import type {C} from './externals/first';

import UM from './unused/module';

const {N, M, K: T} = require('./externals/second');
const P = require('./externals/second');

const UR = require('./unused/module');

type X = {
    a: A,
    b: F,
    c: C,
    d: D,
};

type Y = {
    n: N,
    m: M,
    k: T,
    p: P,
};

// ###
[
    {
        type: 'record',
        name: 'A',
        namespace: 'externals.first',
        fields: [{name: 'a', type: 'boolean'}],
    },
    {
        type: 'record',
        name: 'B',
        namespace: 'externals.first',
        fields: [{name: 'b', type: 'string'}],
    },
    {
        type: 'record',
        name: 'CC',
        namespace: 'externals.first',
        fields: [{name: 'c', type: 'double'}],
    },
    {
        type: 'record',
        name: 'D',
        namespace: 'externals.first',
        fields: [{name: 'd', type: 'double'}],
    },
    {
        type: 'record',
        name: 'N',
        namespace: 'externals.second',
        fields: [{name: 'n', type: 'boolean'}],
    },
    {
        type: 'record',
        name: 'M',
        namespace: 'externals.second',
        fields: [{name: 'm', type: 'string'}],
    },
    {
        type: 'record',
        name: 'KK',
        namespace: 'externals.second',
        fields: [{name: 'k', type: 'double'}],
    },
    {
        type: 'record',
        name: 'P',
        namespace: 'externals.second',
        fields: [{name: 'p', type: 'double'}],
    },
    {
        type: 'record',
        name: 'X',
        namespace: 'externals',
        fields: [
            {name: 'a', type: 'externals.first.A'},
            {name: 'b', type: 'externals.first.B'},
            {name: 'c', type: 'externals.first.CC'},
            {name: 'd', type: 'externals.first.D'},
        ],
    },
    {
        type: 'record',
        name: 'Y',
        namespace: 'externals',
        fields: [
            {name: 'n', type: 'externals.second.N'},
            {name: 'm', type: 'externals.second.M'},
            {name: 'k', type: 'externals.second.KK'},
            {name: 'p', type: 'externals.second.P'},
        ],
    },
]
