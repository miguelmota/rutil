# rutil v0.1.0

[r]andom [util]ities

## isObject

```
rutil.isObject({}) // true
rutil.isObject([]) // false

rutil.isObject({}, true) // true
rutil.isObject([], true) // true
```

## isArray

```
rutil.isArray([]) // true
```

## serialize

```
var obj = {
	uid: 123,
	t: [
		'foo',
		'bar'	
	],
	o: {baz: 'qux'},
	q: 'foo bar'	
};

rutil.serialize(obj) // uid=123&t=foo&t=bar&o%5Bbaz%5D=qux&q=foo%20bar
```

## createPixel
	
```
var url = 'http://example.com/pixel-tracker?id=1234567890

rutil.createPixel(url)
```

# License

Released under the MIT License.
