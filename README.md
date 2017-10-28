# flow2avro

## Example

Input:
```javascript
$ ./bin/flow2avro -
    interface Foo {
        foo: string,
        bar: ?number,
        baz: 'one' | 'two',
        mix: 'one' | 'two' | number,
    }
```

Output:
```javascript
{
    Foo: {
        type: 'record',
        fields: [
            { name: 'foo', type: 'string' },
            { name: 'bar', type: [ 'null', 'double' ] },
            { name: 'baz', type: { type: 'enum', symbols: [ 'one', 'two' ] } },
            { name: 'mix', type: [
                'double',
                { type: 'enum', symbols: [ 'one', 'two' ] }
            ] }
        ],
        name: 'Foo'
    }
}
```

## TODO:

* Tests.
* Generics.
* Namespaces.
* Mixed type.
