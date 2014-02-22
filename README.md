# rutil v0.0.1

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

### merge

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

rutil.createPixel(url); // appends image tag to body
```

### getParams

```javascript
// current url: http://example.com/?foo=bar&baz=qux

rutil.getParams(); // {foo: "bar", baz: "qux"}
```

```javascript
var url = 'http://example.com/?foo=bar&baz=qux';

rutil.getParms(url) // {foo: "bar", baz: "qux"}
```

### generateUUID

```javascript
rutil.generateUUID(); // 049128ed-b16c-4689-90d2-e910860d2797
```

### generateRandomString

```javascript
rutil.generateRandomString(); // Ne46OxeEbWeDdFSDmwbOq4kfGkoKlMSh

rutil.generateRandomString(16); // mOPJBXXc9MR7nQf8

rutil.generateRandomString(6, '0123456789'); // 388048
```

### hexToRgb

```javascript
var hex = '#0077aa';

var rgb = rutil.hexToRgb(hex); // {"r":0,"g":119,"b":170}

rgb.g // 119
```

### getDatesInbetween

```javascript
var from = new Date(2013,10,22);
var until = new Date(2013,11,25);

var dates = rutil.getDatesInbetween(from, until);

dates.forEach(function(date) {
  date // obj: Fri Nov 22 2013 00:00:00 GMT-0800 (PST)
});
```

### parseHashtag

```javascript
var string = '#foo #bar';

var linkifiedString = rutil.parseHashtag(string, 'http://twitter.com/search?q={{tag}}');

linkifiedString // <a href="http://twitter.com/search?q=%23foo">#foo</a> <a href="http://twitter.com/search?q=%23bar">#bar</a>
```

### parseUsername

```javascript
var string = '@foo @bar';

var linkifiedString = rutil.parseUsername(string, 'http://twitter.com/{{username}}');

linkifiedString // <a href="http://twitter.com/foo">@foo</a> <a href="http://twitter.com/bar">@bar</a>
```

### parseUrl

```javascript
var string = 'http://example.com/ http://github.com/';

var linkifiedString = rutil.parseUrl(string);

linkifiedString // <a href="http://example.com/">http://example.com/</a> <a href="http://github.com/">http://github.com/</a>
```

### stripTags

```javascript
var htmlString = '<p><strong>foo</strong></p>';

var text = rutil.stripTags(htmlString);

text // foo
```

### formatPhone

```javascript
var phone = 1234567890;

var formattedPhone = rutil.formatPhone(phone);

formattedPhone // (123) 456-7890
```

### validate.email

```javascript
var email = 'foo.bar-5@qux.com';

rutil.validate.email(email); // true
```

### validate.zip

```javascript
var zip = 12345;

rutil.validate.zip(zip); // true
```

```javascript
var zip = '12345-2453';

rutil.validate.zip(zip); // true
```

### validate.minAge

```javascript
var birthDate = new Date(1998, 02, 20);

rutil.validate.minAge(birthDate, 18); // true
```

### addCommas

```javascript
var number = 1234567890.1234;

var numberWithCommas = rutil.addCommas(number);

numberWithCommas // 1,234,567,890.1234
```

### isMobileDevice

```javascript
rutil.isMobileDevice(); // bool

rutil.isMobileDevice('ios'); // bool
```

```
options: 'iphone', 'ipad', 'ios', 'ios7', 'android', 'blackberry', 'ie', 'opera', 'webos'
```

### toBool

```javascript
var string = 'true';

rutil.toBool(string); // true
```

```
options: 'true', 'yes', 'on', '1'
```

### sleep

```javascript
console.log('start sleep');
rutil.sleep(50000);
console.log('This will show after 5 seconds');
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
