import Parser from './parser';
import Collector from './collector';
import type {Type} from './types';

// @see babel#6805.
//export {Parser, Collector};

export default function (path: string): {+types: Type[]} {
    const parser = new Parser;
    const collector = new Collector(parser);

    collector.collect(path);

    return collector;
}
