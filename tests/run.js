import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml-js';

import collect from '../src';

function run(title) {
    let actual, expected;

    // Run the collector only if the suite will be checked.
    before(() => {
        actual = collect(title + '.js');
        expected = yaml.load(fs.readFileSync(title + '.yaml', 'utf8'));
    });

    it('should provide expected types', () => {
        assert.deepEqual((actual: any).types, (expected: any).types);
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
