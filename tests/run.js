import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml-js';
import wu from 'wu';

import collect from '../src';

function run(title) {
    let actual, expected: any;

    // Run the collector only if the suite will be checked.
    before(() => {
        actual = collect(title + '.js');
        expected = yaml.load(fs.readFileSync(title + '.yaml', 'utf8'));
    });

    it('should not include cycles', () => {
        assert.deepEqual(detectCycles(actual.types), new Set);
    });

    it('should provide expected types', () => {
        assert.deepEqual(actual.types, expected.types);
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

    fs.readdirSync('.')
        .filter(name => path.extname(name) === '.js')
        .forEach(name => {
            const title = path.basename(name, '.js');

            describe(title, () => run(title));
        });
}

main();
