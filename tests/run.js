import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

import collect from '../src';

function run(title) {
    let actual, expected;

    // Run the collector only if the suite will be checked.
    before(() => {
        actual = collect(title + '.js');
        expected = JSON.parse(fs.readFileSync(title + '.json', 'utf8'));
    });

    it('should provide expected schemas', () => {
        assert.deepEqual(actual.schemas, expected.schemas);
    });

    it('should run expected tasks', () => {
        assert.equal(actual.taskCount, expected.taskCount);
    });
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
