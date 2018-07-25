// @flow

import * as yaml from 'yaml-js';
import yargs from 'yargs';
import stringifyJson from 'json-stringify-pretty-compact';

import collect from '.';

type Args = {
    _: string[],
    type: 'json-schema' | 'intermediate',
    indent: number,
    maxWidth: number,
};

function run(file: string, args: Args): string {
    const {types, schema} = collect(file);

    switch (args.type) {
        case 'intermediate':
            return yaml.dump(types, null, null, {
                indent: args.indent,
                width: args.maxWidth,
            }).trimRight();
        case 'json-schema':
        default:
            return stringifyJson(schema, {
                indent: args.indent,
                maxLength: args.maxWidth,
            });
    }
}

export default function (argv: string[]) {
    const args: Args = yargs(argv)
        .usage('flow2schema -t type [file]')
        .option('type', {
            alias: 't',
            choices: ['json-schema', 'intermediate'],
            demand: true,
        })
        .option('indent', {
            type: 'number',
            default: 4,
            coerce: val => val >= 2 ? Math.floor(val) : 4,
        })
        .option('max-width', {
            type: 'number',
            default: 100,
            coerce: val => val >= 20 ? Math.floor(val) : 100,
        })
        .argv;

    // TODO: support Windows.
    const file = args._.length === 0 ? '/dev/stdin' : args._[0];

    try {
        const output = run(file, args);

        console.log(output);
    } catch (ex) {
        console.error(ex.message);
        console.error(ex.stack);

        process.exit(1);
    }
}
