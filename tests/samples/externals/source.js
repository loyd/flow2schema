import D, {A, B as F} from './modules/first';
import type {C} from './modules/first';

import UM from './unused/module';

const {N, M, K: T} = require('./modules/second');
const P = require('./modules/second');

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

export {X, Y};
