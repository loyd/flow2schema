import stringify from 'json-stringify-pretty-compact';
import * as optimist from 'optimist';

import collect from '.';

const argv = optimist
    .usage('Usage: $0 <path> ...')
    .argv;

argv._.forEach(run);

function run(path: string) {
    if (path === '-') {
        path = '/dev/stdin';
    }

    try {
        const {schemas} = collect(path);

        console.log(stringify(schemas, {maxLength: 100}));
    } catch (ex) {
        console.error(ex.message);
        console.error(ex.stack);
    }
}
