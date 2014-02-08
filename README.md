# rutil v0.1.0

Random utilities

# Install

Available via [Bower](http://bower.io/)

```bash
bower install rutil
```

# Utilities

### isObject

```javascript
rutil.isObject({}); // true
rutil.isObject([]); // false

rutil.isObject({}, true); // true
rutil.isObject([], true); // true
```

### isArray

```javascript
rutil.isArray([]); // true
```

### serialize

```javascript
var obj = {
	uid: 123,
	t: [
		'foo',
		'bar'	
	],
	o: {baz: 'qux'},
	q: 'foo bar'	
};

rutil.serialize(obj); // uid=123&t=foo&t=bar&o%5Bbaz%5D=qux&q=foo%20bar
```

### createPixel
	
```javascript
var url = 'http://example.com/pixel-tracker?id=1234567890';

rutil.createPixel(url);
```

### getParams
	
```javascript
// http://example.com/?foo=bar&baz=qux

var params = rutil.getParams(); // {foo: "bar", baz: "qux"} 

var url = 'http://example.com/?foo=bar&baz=qux';
var params = rutil.getParms(url)
```

# Test

Using [Jasmine](http://pivotal.github.io/jasmine/) for testing

```
grunt test
```

# Build

```
grunt build
```

# License

Released under the MIT License.
