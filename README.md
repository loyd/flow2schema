# flow2avro

[![Version npm](https://img.shields.io/npm/v/flow2avro.svg)](https://www.npmjs.com/package/flow2avro)
[![Linux Build](https://travis-ci.org/loyd/flow2avro.svg?branch=master)](https://travis-ci.org/loyd/flow2avro)
[![Windows Build](https://ci.appveyor.com/api/projects/status/github/loyd/flow2avro?branch=master&svg=true)](https://ci.appveyor.com/project/loyd/flow2avro)
[![Coverage Status](https://coveralls.io/repos/github/loyd/flow2avro/badge.svg?branch=master)](https://coveralls.io/r/loyd/flow2avro?branch=master)

## Example

Input (`$ cat example.js`):
```javascript
export interface Foo {
    foo: string,
    // $avro long
    bar: number,
    opt: ?number,
    baz: 'one' | 'two',
    mix: 'one' | 'two' | number,
}
```

Output (`$ ./bin/flow2avro example.js`):
```json
[
  {
    "type": "record",
    "fields": [
      {"name": "foo", "type": "string"},
      {"name": "bar", "type": "double"},
      {"name": "opt", "type": ["null", "double"]},
      {"name": "baz", "type": {"type": "enum", "symbols": ["one", "two"]}},
      {
          "name": "mix",
          "type": ["double", {"type": "enum", "symbols": ["one", "two"]}]
      }
    ],
    "name": "Foo",
    "namespace": "example"
  }
]
```

## TODO
* Generics.
* Errors and warnings.
* Support commonjs modules.
* Documentation.
