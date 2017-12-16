import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml-js';
import wu from 'wu';
import Ajv from 'ajv';

import collect from '../src';

function run(title) {
    let actual, expectedTypes, expectedSchema;

    // Run the collector only if the suite will be checked.
    before(() => {
        actual = collect(title + '/source.js');
        expectedTypes = yaml.load(fs.readFileSync(title + '/types.yaml', 'utf8'));
        expectedSchema = JSON.parse(fs.readFileSync(title + '/schema.json', 'utf8'));
    });

    it('should not include cycles', () => {
        assert.deepEqual(detectCycles(actual.types), new Set);
    });

    it('should provide expected types', () => {
        assert.deepEqual(actual.types, expectedTypes);
    });

    it('should generate valid JSON schema', () => {
        const ajv = new Ajv;

        ajv.validateSchema(actual.schema);

        assert.equal(ajv.errors, null);
    });

    it('should provide expected JSON schema', () => {
        assert.deepEqual(actual.schema, expectedSchema);
    });
}

function detectCycles(obj: mixed, cycles: Set<mixed> = new Set, objs: Set<mixed> = new Set) {
    if (obj == null || typeof obj !== 'object') {
        return cycles;
    }

    if (objs.has(obj)) {
        cycles.add(obj);
    }

    objs.add(obj);

    if (obj instanceof Array) {
        wu(obj).forEach(item => detectCycles(item, cycles, objs));
    } else {
        wu.values(obj).forEach(item => detectCycles(item, cycles, objs));
    }

    return cycles;
}

function main() {
    process.chdir(path.join(__dirname, 'samples'));

    for (const title of fs.readdirSync('.')) {
        describe(title, () => run(title));
    }
}

main();
