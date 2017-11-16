# flow2schema

[![Version npm](https://img.shields.io/npm/v/flow2schema.svg)](https://www.npmjs.com/package/flow2schema)
[![Linux Build](https://travis-ci.org/loyd/flow2schema.svg?branch=master)](https://travis-ci.org/loyd/flow2schema)
[![Windows Build](https://ci.appveyor.com/api/projects/status/github/loyd/flow2schema?branch=master&svg=true)](https://ci.appveyor.com/project/loyd/flow2schema)
[![Coverage Status](https://coveralls.io/repos/github/loyd/flow2schema/badge.svg?branch=master)](https://coveralls.io/r/loyd/flow2schema?branch=master)

Currently avro is the only supported target.

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

Output (`$ ./bin/flow2schema example.js`):
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
* Complete generics support.
* Errors and warnings.
* Support commonjs modules.
* Documentation.
