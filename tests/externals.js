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
