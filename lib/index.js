'use strict';

const assert = require('assert');

const parse = require('./parser');
const visit = require('./visitor');
const extract = require('./extractor');

function collect(node, schemes) {
    const scheme = extract(node);

    const name = node.id.name;

    assert(!schemes[name]);

    scheme.name = name;

    schemes[name] = scheme;

    return false;
}

const visitor = {
    TypeAlias: collect,
    InterfaceDeclaration: collect,
    ClassDeclaration: collect,
};

function generate(code) {
    const ast = parse(code);

    const schemes = Object.create({});

    visit(ast, visitor, schemes);

    return schemes;
}

module.exports = generate;
