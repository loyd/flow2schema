// @flow

import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml-js';
import wu from 'wu';
import Ajv from 'ajv';
import stringifyJson from 'json-stringify-pretty-compact';

import collect from '../src';

function run(title, generateMissing) {
    let actual, expectedTypes, expectedSchema;

    // Run the collector only if the suite will be checked.
    before(() => {
        actual = collect(title + '/source.js');
        expectedTypes = readFileAndPrepare(title + '/types.yaml', yaml.load);
        expectedSchema = readFileAndPrepare(title + '/schema.json', JSON.parse);
    });

    it('should not include cycles', () => {
        assert.deepEqual(detectCycles(actual.types), new Set);
    });

    it('should provide expected types', () => {
        if (expectedTypes === undefined && generateMissing) {
            console.log('Generating types.yaml...');

            const content = yaml.dump(actual.types, null, null, {
                indent: 4,
                width: 100,
            }).trimRight();

            fs.writeFileSync(title + '/types.yaml', content);
        } else {
            assert.deepEqual(actual.types, expectedTypes);
        }
    });

    it('should generate valid JSON schema', () => {
        const ajv = new Ajv;

        ajv.validateSchema(actual.schema);

        assert.equal(ajv.errors, null);
    });

    it('should provide expected JSON schema', () => {
        if (expectedSchema === undefined && generateMissing) {
            console.log('Generating schema.json...');

            const content = stringifyJson(actual.schema, {
                indent: 4,
                maxLength: 100,
            });

            fs.writeFileSync(title + '/schema.json', content);
        } else {
            assert.deepEqual(actual.schema, expectedSchema);
        }
    });
}

function readFileAndPrepare<R>(path: string, prepare: string => R): R | void {
    let data;

    try {
        data = fs.readFileSync(path, 'utf8');
    } catch (ex) {
        if (ex.code === 'ENOENT') {
            return undefined;
        }

        throw ex;
    }

    return prepare(data);
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

    const generateMissing = process.env.GENERATE_MISSING === '1';

    for (const title of fs.readdirSync('.')) {
        describe(title, () => run(title, generateMissing));
    }
}

main();
