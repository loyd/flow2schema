'use strict';

const parse = require('./parser');
const visit = require('./visitor');
const extract = require('./extractor');

function collect(node, schemas) {
    extract(node, schemas);

    return false;
}

const visitor = {
    TypeAlias: collect,
    InterfaceDeclaration: collect,
    ClassDeclaration: collect,
};

function generate(code) {
    const ast = parse(code);

    const schemas = Object.create({});

    visit(ast, visitor, schemas);

    return schemas;
}

module.exports = generate;
