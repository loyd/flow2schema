import Parser from './parser';
import Collector from './collector';

// @see babel#6805.
//export {Parser, Collector};

export default function collect(path) {
    const parser = new Parser;
    const collector = new Collector(parser);

    collector.collect(path);

    return collector;
}
