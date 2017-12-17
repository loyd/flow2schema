# flow2schema

[![Version npm](https://img.shields.io/npm/v/flow2schema.svg)](https://www.npmjs.com/package/flow2schema)
[![Linux Build](https://travis-ci.org/loyd/flow2schema.svg?branch=master)](https://travis-ci.org/loyd/flow2schema)
[![Windows Build](https://ci.appveyor.com/api/projects/status/github/loyd/flow2schema?branch=master&svg=true)](https://ci.appveyor.com/project/loyd/flow2schema)
[![Coverage Status](https://coveralls.io/repos/github/loyd/flow2schema/badge.svg?branch=master)](https://coveralls.io/r/loyd/flow2schema?branch=master)

## Example

```sh
$ cat example.js
```
```js
type A<T, K> = {
    t: T,
    k: K,
};

export type X = {
    a: A<string, boolean>,
    b: number,
};
```

```sh
$ flow2schema -t json-schema example.js
```

```json
{
    "$schema": "http://json-schema.org/draft-06/schema#",
    "definitions": {
        "example::A::string::boolean": {
            "type": "object",
            "properties": {
                "t": {"type": "string"},
                "k": {"type": "boolean"}
            },
            "required": ["t", "k"]
        },
        "example::X": {
            "type": "object",
            "properties": {
                "a": {"$ref": "#/definitions/example::A::string::boolean"},
                "b": {"type": "number"}
            },
            "required": ["a", "b"]
        }
    }
}
```

## TODO
* Complete generics support.
* Errors and warnings.
* Complete commonjs support.
* Documentation.
* Stabilize API.
* Webpack plugin.
* Rollup plugin.
