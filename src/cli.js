import * as yaml from 'yaml-js';
import * as optimist from 'optimist';
import stringifyJson from 'json-stringify-pretty-compact';

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
        const [indent, width] = [4, 80];
        const {types, schema} = collect(path);

        const typesOutput = yaml.dump(types, null, null, {
            indent,
            width,
        }).trimRight();

        const schemaOutput = stringifyJson(schema, {
            indent,
            maxLength: width,
        });

        console.log(typesOutput);
        console.log('--------');
        console.log(schemaOutput);
    } catch (ex) {
        console.error(ex.message);
        console.error(ex.stack);
    }
}
