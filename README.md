# rutil v0.0.4

Random utilities

# Install

Available via [Bower](http://bower.io/)

```bash
bower install rutil
```

Available via [npm](https://www.npmjs.org/)

```bash
npm install rutil
```

# Utilities

### isObject(obj])

```javascript
rutil.isObject({}); // true
rutil.isObject([]); // false
```

### isArray(arr)

```javascript
rutil.isArray([]); // true
```

### merge(obj1, obj2)

```javascript
var obj1 = {
	foo: 'bar',
	baz: 1234
};

var obj2 = {
	foo: 'qux'
};

var obj3 = rutil.merge(obj1, obj2);

obj3 // {foo: "qux", baz: 1234}
```

### serialize(obj)

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

### shuffle(arr)

```javascript
var arr = ['a', 'b', 'c', 'd', 'e', 'f'];

var shuffled = rutil.shuffle(arr);

shuffled // ['c', 'e', 'b', 'd', 'f', 'a']
```

### getParams([url])

```javascript
// current url: http://example.com/?foo=bar&baz=qux

rutil.getParams(); // {foo: "bar", baz: "qux"}
```

```javascript
var url = 'http://example.com/?foo=bar&baz=qux';

rutil.getParms(url) // {foo: "bar", baz: "qux"}
```

### setQueryStringParam(uri, key, val)

```javascript
var uri = 'http://example.com?foo=bar';

uri = rutil.setQueryStringParam(uri, 'foo', 'qux');

uri // http://example.com?foo=qux
```

### generateUUID()

```javascript
rutil.generateUUID(); // 049128ed-b16c-4689-90d2-e910860d2797
```

### generateRandomString([length], [str])

```javascript
rutil.generateRandomString(); // Ne46OxeEbWeDdFSDmwbOq4kfGkoKlMSh

rutil.generateRandomString(16); // mOPJBXXc9MR7nQf8

rutil.generateRandomString(6, '0123456789'); // 388048
```

### random(min, max)

```javascript
rutil.random(0,9); // 6
```

### hexToRgb(hex)

```javascript
var hex = '#0077aa';

var rgb = rutil.hexToRgb(hex); // {"r":0,"g":119,"b":170}

rgb.g // 119
```

### getDatesInbetween(dateObj1, dateObj2)

```javascript
var from = new Date(2013,10,22);
var until = new Date(2013,11,25);

var dates = rutil.getDatesInbetween(from, until);

dates.forEach(function(date) {
  date // obj: Fri Nov 22 2013 00:00:00 GMT-0800 (PST)
});
```

### parseHashtag(str, url)

```javascript
var string = '#foo #bar';

var linkifiedString = rutil.parseHashtag(string, 'http://twitter.com/search?q={{tag}}');

linkifiedString // <a href="http://twitter.com/search?q=%23foo">#foo</a> <a href="http://twitter.com/search?q=%23bar">#bar</a>
```

### parseUsername(str, url)

```javascript
var string = '@foo @bar';

var linkifiedString = rutil.parseUsername(string, 'http://twitter.com/{{username}}');

linkifiedString // <a href="http://twitter.com/foo">@foo</a> <a href="http://twitter.com/bar">@bar</a>
```

### parseUrl(str)

```javascript
var string = 'http://example.com/ http://github.com/';

var linkifiedString = rutil.parseUrl(string);

linkifiedString // <a href="http://example.com/">http://example.com/</a> <a href="http://github.com/">http://github.com/</a>
```

### stripTags(str)

```javascript
var htmlString = '<p><strong>foo</strong></p>';

var text = rutil.stripTags(htmlString);

text // foo
```

### formatPhone(num)

```javascript
var phone = 1234567890;

var formattedPhone = rutil.formatPhone(phone);

formattedPhone // (123) 456-7890
```

### isValidEmail(str)

```javascript
var email = 'foo.bar-5@qux.com';

rutil.isValidEmail(email); // true
```

### isValidZip(num)

```javascript
var zip = 12345;

rutil.isValidZip(zip); // true
```

### isValidName(str)

```javascript
rutil.isValidName('Foo'); // true
rutil.isValidName('Foo*'); // false
rutil.isValidName('Foo1'); // false
```

### isValidUsername(str)

```javascript
rutil.isValidUsername('foo') // true
rutil.isValidUsername('foo_bar1') // true
rutil.isValidUsername('foo-bar') // false
```

```javascript
var zip = '12345-2453';

rutil.isValidZip(zip); // true
```

### isValidMinAge(dateObj, num)

```javascript
var birthDate = new Date(1998, 02, 20);

rutil.isValidMinAge(birthDate, 18); // true
```

### addCommas(num)

```javascript
var number = 1234567890.1234;

var numberWithCommas = rutil.addCommas(number);

numberWithCommas // 1,234,567,890.1234
```

### repeat(str, [times])

```javascript
rutil.repeat('foo'); // foofoo
rutil.repeat('foo', 5); // foofoofoofoofoo
```

### pad(num)

```javascript
rutil.pad(10); // 10
rutil.pad(9); // 9
```

### capitalize(str, [lowercase])

```javascript
rutil.capitalize('foo'); // Foo
rutil.capitalize('fooBarQux'); // 'FooBarQux'
rutil.capitalize('fooBarQux', true); // 'Foobarqux'
```

### isMobileDevice([device])

```javascript
rutil.isMobileDevice(); // bool

rutil.isMobileDevice('ios'); // bool
```

```
options: 'iphone', 'ipad', 'ios', 'ios7', 'android', 'blackberry', 'ie', 'opera', 'webos'
```

### createPixel(url)

```javascript
var url = 'http://example.com/pixel-tracker?id=1234567890';

rutil.createPixel(url); // appends image tag to body
```

### toBool(str)

```javascript
var string = 'true';

rutil.toBool(string); // true
```

```
options: 'true', 'yes', 'on', '1'
```

### sleep(num)

```javascript
console.log('start sleep');
rutil.sleep(50000);
console.log('This will show after 5 seconds');
```

# Extend _

To extend the `_` when using libraries such as [underscore](http://underscorejs.org/) or [lodash](http://lodash.com/), pass in `rutil._()` to the underscore mixin function. Rutil functions will not override underscore functions if they already exist, unless you pass `rutil._(true)`

```
_.mixin(rutil._()); // extend underscore

_.isValidEmail('foo@bar.com'); // use rutil function
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
