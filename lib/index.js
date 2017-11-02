'use strict';

const Parser = require('./parser');
const Collector = require('./collector');

function collect(path) {
    const parser = new Parser;
    const collector = new Collector(parser);

    collector.collect(path);

    return collector;
}

module.exports = collect;
module.exports.Parser = Parser;
module.exports.Collector = Collector;
