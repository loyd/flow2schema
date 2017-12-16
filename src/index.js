import Parser from './parser';
import Collector from './collector';
import type {Type} from './types';
import generateJsonSchema from './generators/jsonSchema';
import type {Schema} from './generators/jsonSchema';

// @see babel#6805.
//export {Parser, Collector};

export default function (path: string): {+types: Type[], +schema: Schema} {
    const parser = new Parser;
    const collector = new Collector(parser);

    collector.collect(path);

    const fund = collector.finish();

    return {
        types: Array.from(fund.takeAll()),
        schema: generateJsonSchema(fund),
    };
}
