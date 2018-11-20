// @flow

import Parser from './parser';
import Collector from './collector';
import type {Type} from './types';
import generateJsonSchema, {type Schema} from './generators/jsonSchema';
import type {Options} from './options';

export type $$extDef<T, D> = () => T;

// @see babel#6805.
//export {Parser, Collector};

function collect(path: string, options?: Options): {+types: Type[], +schema: Schema} {
    const parser = new Parser;
    const collector = new Collector(parser, options);

    collector.collect(path);

    const fund = collector.finish();

    return {
        types: Array.from(fund.takeAll()),
        schema: generateJsonSchema(fund, options),
    };
}

// Export in CommonJS for the users.
module.exports = collect;
