var _ = require('lodash');
var rutil = require('../../rutil');

describe("Rutil", function() {

    /**
     * Objects
     */

    xdescribe("isEmpty", function() {
        it("should return true if empty value", function() {
            expect(rutil.isEmpty('')).toBeTruthy();
            expect(rutil.isEmpty([])).toBeTruthy();
            expect(rutil.isEmpty({})).toBeTruthy();
            expect(rutil.isEmpty(undefined)).toBeTruthy();
            expect(rutil.isEmpty(null)).toBeTruthy();
            expect(rutil.isEmpty(0)).toBeFalsy();
        });
    });

    xdescribe("isExisty", function() {
        it("should return true if not null or undefined", function() {
            expect(rutil.isExisty(null)).toBeFalsy();
            expect(rutil.isExisty(undefined)).toBeFalsy();
            expect(rutil.isExisty(0)).toBeTruthy();
            expect(rutil.isExisty(1)).toBeTruthy();
            expect(rutil.isExisty(false)).toBeTruthy();
            expect(rutil.isExisty('')).toBeTruthy();
        });

    });

    xdescribe("isTruthy", function() {

        it("should return truthy", function() {
            expect(rutil.isTruthy('')).toBeFalsy();
            expect(rutil.isTruthy(0)).toBeFalsy();
            expect(rutil.isTruthy(null)).toBeFalsy();
            expect(rutil.isTruthy(undefined)).toBeFalsy();
            expect(rutil.isTruthy(1)).toBeTruthy();
            expect(rutil.isTruthy({})).toBeTruthy();
            expect(rutil.isTruthy((function() { return true; })())).toBeTruthy();
        });

    });

    xdescribe("isFalsy", function() {

        it("should return falsy", function() {
            expect(rutil.isFalsy('')).toBeTruthy();
            expect(rutil.isFalsy(0)).toBeTruthy();
            expect(rutil.isFalsy(null)).toBeTruthy();
            expect(rutil.isFalsy(undefined)).toBeTruthy();
            expect(rutil.isFalsy(1)).toBeFalsy();
            expect(rutil.isFalsy({})).toBeFalsy();
        });

    });

    xdescribe("isString", function() {
        it("should return true if string", function() {
            expect(rutil.isString('')).toBeTruthy();
            expect(rutil.isString(0)).toBeFalsy();
            expect(rutil.isString(false)).toBeFalsy();
            expect(rutil.isString(null)).toBeFalsy();
            expect(rutil.isString(function(){})).toBeFalsy();
        });
    });

    xdescribe("isNumber", function() {
        it("should return true if number", function() {
            expect(rutil.isNumber('')).toBeFalsy();
            expect(rutil.isNumber(0)).toBeTruthy();
            expect(rutil.isNumber(false)).toBeFalsy();
            expect(rutil.isNumber(null)).toBeFalsy();
            expect(rutil.isNumber(function(){})).toBeFalsy();
        });
    });

    xdescribe("isBoolean", function() {
        it("should return true if boolean", function() {
            expect(rutil.isBool('')).toBeFalsy();
            expect(rutil.isBool(0)).toBeFalsy();
            expect(rutil.isBool(false)).toBeTruthy();
            expect(rutil.isBool(true)).toBeTruthy();
            expect(rutil.isBool(null)).toBeFalsy();
            expect(rutil.isBool(function(){})).toBeFalsy();
        });
    });

    xdescribe("isFunction", function() {

        it("should return true if function", function() {
            var obj = {
                f: function() {}
            };
            expect(rutil.isFunction('')).toBeFalsy();
            expect(rutil.isFunction(1)).toBeFalsy();
            expect(rutil.isFunction(function(){})).toBeTruthy();
            expect(rutil.isFunction(obj.f)).toBeTruthy();
        });

    });

    xdescribe("noop", function() {
        it("should return an empty function", function() {
            expect(rutil.noop()).not.toBeDefined();
        });
    });

    xdescribe("functor", function() {
        it("should wrap value in function if not function", function() {

            var f = 'foo';
            var g = function() {
                return 'bar';
            };

            expect(rutil.isFunction(rutil.functor(f))).toBeTruthy();
            expect(rutil.functor(f)()).toEqual('foo');

            expect(rutil.isFunction(rutil.functor(g))).toBeTruthy();
            expect(rutil.functor(g)()).toEqual('bar');
        });

    });

    xdescribe("preCondition", function() {
        it("should succeed if valid", function() {

            var conditions = [
                (function() {
                   return true;
                })(),
                true
            ];

            var o = {
                success: function success() {

                },
                fail: function fail() {

                }
            };

            spyOn(o, 'success');
            spyOn(o, 'fail');

            expect(rutil.preCondition(conditions)).toBeTruthy();
            rutil.preCondition(conditions, o.success, o.fail)
            expect(o.success).toHaveBeenCalled();
            expect(o.fail).not.toHaveBeenCalled();

            conditions = [
                (function() {
                    return false;
                })(),
                true
            ];

            expect(rutil.preCondition(conditions)).toBeFalsy();

            conditions = [
                (function() {
                    return true;
                })(),
                false
            ];

            expect(rutil.preCondition(conditions)).toBeFalsy();
        });

    });

    xdescribe("complement", function() {
        it("should return complement", function() {
            function f() {
                return true;
            }
            var g = rutil.complement(f);
            expect(f()).toBeTruthy();
            expect(g()).toBeFalsy();
        });
    });


    xdescribe("prop", function() {
        it("should return a function that returns the object's value", function() {

            var o = {
                foo: 'foq',
                bar: 'baq'
            };
            var obj = rutil.prop(o);

            expect(obj('foo')).toEqual('foq');
            expect(obj('bar')).toEqual('baq');
        });

    });

    xdescribe("prop", function() {
        it("should return a function that returns the object's value", function() {

            var o = {
                foo: 'foq',
                bar: 'baq'
            };
            var obj = rutil.prop(o);

            expect(obj('foo')).toEqual('foq');
            expect(obj('bar')).toEqual('baq');
        });

    });

    xdescribe("idenity", function() {
        it("should return itself", function() {
            expect(rutil.identity({foo: 'bar'})).toEqual({foo: 'bar'});
        });
    });

    /**
     * Arrays
     */

    xdescribe("toArray", function() {
        it("should return an array", function() {
            (function() {
                expect(rutil.toArray(arguments)).toEqual([1,2,3]);
            })(1,2,3);
        });
    });

    xdescribe("flatten", function() {
        it("should flatten an array recursively", function() {
            expect(rutil.flatten(['o',1,[['q', {a:'b'}, ['c',2]]]])).toEqual(['o',1,'q',{a:'b'},'c',2]);
        });
    });

    xdescribe("reduce", function() {
        it("should reduce array", function() {
            expect(rutil.reduce([1,2,3], function(acc, v, i) {
                return acc += v;
            })).toEqual(6);
        });
    });

    xdescribe("map", function() {
        it("should map array", function() {
            expect(rutil.map([1,2,3], function(v, i) {
                return v * 2;
            })).toEqual([2,4,6]);
        });
    });

    xdescribe("filter", function() {
        it("should filter array", function() {
            expect(rutil.filter([1,2,3], function(v, i) {
                return v % 2 === 1;
            })).toEqual([1,3]);
        });
    });

    xdescribe("some", function() {
        it("should return true if some", function() {
            expect(rutil.some([1,2,3], function(v, i) {
                return v > 2;
            })).toBeTruthy();
            expect(rutil.some([2,4,6], function(v, i) {
                return v % 2 === 1;
            })).toBeFalsy();
        });
    });

    xdescribe("every", function() {
        it("should return true if every", function() {
            expect(rutil.every([2,4,6], function(v, i) {
                return v < 5;
            })).toBeFalsy();
            expect(rutil.every([2,4,6], function(v, i) {
                return v % 2 === 0;
            })).toBeTruthy();
        });
    });

    xdescribe("sum", function() {
        it("should sum all values in array", function() {
            expect(rutil.sum([2,3,4,5,3,23,45,[2,[4,6]]])).toEqual(97);
        });
    });

    xdescribe("sum", function() {
        it("should sum all values in array", function() {
            expect(rutil.sum([2,3,4,5,3,23,45,[2,[4,6]]])).toEqual(97);
        });
    });

    xdescribe("size", function() {
        it("should return size of array or object", function() {
            expect(rutil.size([2,{},'a'])).toEqual(3);
            expect(rutil.size({a: 'b', c: 2, d: false})).toEqual(3);
            expect(rutil.size('foo')).toEqual(3);
        });
    });

    xdescribe("average", function() {
        it("should return average of sum", function() {
            expect(rutil.average([2,4,6])).toEqual(4);
        });
    });

    xdescribe("int", function() {
        it("should typecast to integer", function() {
            expect(rutil.int('2')).toEqual(2);
        });
    });

    xdescribe("string", function() {
        it("should typecast to string", function() {
            expect(rutil.string(2)).toEqual('2');
        });
    });

    xdescribe("isIndexed", function() {
        it("should return true if indexed", function() {
            expect(rutil.isIndexed([])).toBeTruthy();
            expect(rutil.isIndexed('')).toBeTruthy();
            expect(rutil.isIndexed(1)).toBeFalsy();
            expect(rutil.isIndexed({})).toBeFalsy();
        });
    });

    xdescribe("isDateInRange", function() {
        it("should return true if date in reange", function() {
            expect(rutil.isDateInRange(new Date(2014,05,01), new Date(2014,06,04), new Date(2014,06,03))).toBeTruthy();
            expect(rutil.isDateInRange(new Date(2014,05,01), new Date(2016,08,04), Date.now())).toBeTruthy();
            expect(rutil.isDateInRange(new Date(2014,05,01), new Date(2014,04,04), new Date(2014,06,03))).toBeFalsy();
        });
    });

    xdescribe("comparator", function() {
        it("should return a comparator function", function() {
            var lessOrEqual = function(x, y) {
                return x <= y;
            };

            var greaterOrEqual = function(x, y) {
                return x >= y;
            };

            expect([1,2,3].sort(rutil.comparator(lessOrEqual))).toEqual([1,2,3]);
            expect([1,2,3].sort(rutil.comparator(greaterOrEqual))).toEqual([3,2,1]);
        });
    });

    xdescribe("nth", function() {
        it("should return nth indexed value", function() {
            expect(rutil.nth(['a','b','c'], 2)).toEqual('c');
        });
    });

    xdescribe("first", function() {
        it("should return first indexed value", function() {
            expect(rutil.first(['a','b','c'])).toEqual('a');
        });
    });

    xdescribe("last", function() {
        it("should return last indexed value", function() {
            expect(rutil.last(['a','b','c'])).toEqual('c');
        });
    });

    xdescribe("rest", function() {
        it("should return all but first", function() {
            expect(rutil.rest(['a','b','c'])).toEqual(['b','c']);
        });
    });

    xdescribe("doWhen", function() {
        it("should run action if condition is true", function() {
            var cond = function() {
                return true;
            };

            var cond2= function() {
                return false;
            }

            var o = {
                fun: function() {
                    return 'foo';
                }
            };

            expect(o.fun()).toEqual('foo');
            expect(rutil.isTruthy(cond())).toBeTruthy();
            expect(rutil.doWhen(cond(), o.fun )).toEqual('foo');
            expect(rutil.doWhen(cond2(), o.fun )).toBeFalsy();
        });
    });

    xdescribe("result", function() {
        it("should run property function or return value", function() {
            var o = {
                a: function() {
                    return 'bar';
                },
                b: 'foo'
            };
            expect(rutil.result(o, 'a')).toEqual('bar');
            expect(rutil.result(o, 'b')).toEqual('foo');
        });
    });

    xdescribe("executeIfHasField", function() {
        it("should run function if exity", function() {
            var o = {
                a: function() {
                    return 'bar';
                },
                b: 'foo'
            };
            expect(rutil.result(o, 'a')).toEqual('bar');
            expect(rutil.result(o, 'b')).toEqual('foo');
            expect(rutil.result(o, 'c')).not.toBeDefined();
        });
    });

    xdescribe("forOwn", function() {
        it("should iterate over own properties", function() {
            var o = {
                a: 'b',
                c: function() {},
                d: null
            };

            var keys = [];
            var vals  = [];

            rutil.forOwn(o, function(v, k) {
                keys.push(k);
                vals.push(v);
            });

            expect(keys).toEqual(['a','c','d']);
            expect(vals).toEqual(['b',o.c,null]);
        });
    });

    xdescribe("compactObject", function() {
        it("should return an object with no empty properties", function() {
            expect(rutil.compactObject({a: 'b', foo: null, b: false, taco: 1, qux: 0, c: '', d: []})).toEqual({a: 'b', b: false, taco: 1, qux: 0});
        });
    });

    xdescribe("getParams", function() {

        it("should be able to get params from window url", function(done) {
            if (window) {
                var params = rutil.getParams();
                var url = window.location + '?foo=bar';
                window.history.pushState('test', 'Title', url);
            } else {
                var params = 'http://example.com/?foo=bar';
            }

            params = rutil.getParams();

            expect(params.foo === 'bar').toBeTruthy();
        });

        it("should be able to get params from user url", function() {

            var url = 'http://example.com/?foo=bar&baz=qux';
            var params = rutil.getParams(url);
            //console.log(params);

            expect(params.foo === 'bar').toBeTruthy();
        });

    });

    xdescribe("setQueryStringParam", function() {
        it("should update query string param", function() {
            var uri = 'http://example.com?foo=bar&baz=qux';
            uri = rutil.setQueryStringParam(uri, 'foo', 'qux');
            console.log('uri:', uri);

            expect(uri).toMatch(/foo=qux/);
        });

        it("should set query string param", function() {
            var uri = 'http://example.com?blank=';
            uri = rutil.setQueryStringParam(uri, 'foo', 'qux');
            console.log('uri:', uri);

            expect(uri).toMatch(/foo=qux/);
        });
    });

    xdescribe("generateUUID", function() {
        it("should be be able to generate a UUID", function() {
            var uuid = rutil.generateUUID();
            console.log('uuid:', uuid);

            expect(uuid).not.toBe(null);
            expect(uuid).toMatch(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
        });
    });

    xdescribe("generateRandomSring", function() {
        it("should be be able to generate a random 32 char string", function() {
            var randomString = rutil.generateRandomString();
            console.log('Random string:', randomString);

            expect(randomString).not.toBe(null);
            expect(randomString).toMatch(/\w{32}/);
        });

        it("should be be able to generate a random 6 char number string", function() {
            var randomString = rutil.generateRandomString(6, '0123456789');
            console.log('Random string:', randomString);

            expect(randomString).not.toBe(null);
            //expect(randomString).toEqual(jasmine.any(Number));
            expect(randomString).toMatch(/\w{6}/);
        });
    });

    xdescribe("hexToRgb", function() {

        it("should be be able to convert hex to rgb", function() {
            var hex = '#0077aa';
            var rgb = rutil.hexToRgb(hex);
            console.log('rgb:', JSON.stringify(rgb));

            expect(rgb.g).not.toBe(null);
            expect(rgb.g).toEqual(119);
        });
    });

    xdescribe("getDatesInbetween", function() {

        it("should be be able to get dates inbetween", function() {
            var from = new Date(2013,10,22);
            var until = new Date(2013,11,25);

            var dates = rutil.getDatesInbetween(from, until);
            dates.forEach(function(date) {
                console.log(date);
            });

            expect(dates[0]).not.toBe(null);
            expect(dates[0].getDate()).toEqual(22);
        });
    });

    xdescribe("sleep", function() {

        it("should sleep for 5 seconds", function() {
            console.log('start');
            rutil.sleep(5000);
            console.log('end');

            expect(true).toBeTruthy();
        });
    });

    xdescribe("parseHashtag", function() {

        it("should linkify hashtag", function() {
            var string = 'loremipsum http://example.com/ #foo #bar';
            var newString = rutil.parseHashtag(string, 'http://twitter.com/search?q={{tag}}');
            console.log(newString);

            expect(newString).toMatch(/href/);
        });
    });

    xdescribe("parseUsername", function() {

        it("should linkify username", function() {
            var string = 'loremipsum http://example.com/ @github @twitter';
            var newString = rutil.parseUsername(string, 'http://twitter.com/{{username}}');
            console.log(newString);

            expect(newString).toMatch(/href/);
        });
    });

    xdescribe("parseUrl", function() {

        it("should linkify url", function() {
            var string = 'loremipsum http://example.com/ http://github.com/ #foo #bar';
            var newString = rutil.parseUrl(string);
            console.log(newString);

            expect(newString).toMatch(/(href)/);
        });
    });

    xdescribe("stripTags", function() {

        it("should strip html tags", function() {
            var string = '<p><strong>foo</strong></p>';
            var newString = rutil.stripTags(string);
            console.log(newString);

            expect(newString).toMatch(/^foo$/);
        });
    });

    xdescribe("formatPhone", function() {

        it("should format phone number", function() {
            var phone = 1234567890;
            var formattedPhone = rutil.formatPhone(phone);
            console.log(formattedPhone);

            expect(formattedPhone).toMatch(/\(123\)\s456\-7890/);
        });
    });

    xdescribe("validate.email", function() {

        it("should validate Email", function() {
            var email = 'foo.bar-5@qux.com';
            var isValidEmail = rutil.validate.email(email);
            console.log(isValidEmail);

            expect(isValidEmail).toBeTruthy();
        });

        it("should invalidate email", function() {
            var email = 'foo...bar@qux.com';
            var isValidEmail = rutil.validate.email(email);
            console.log(isValidEmail);

            expect(isValidEmail).toBeFalsy();
        });
    });

    xdescribe("validate.minAge", function() {

        it("should validate minimum age", function() {
            var date = new Date(1996, 02, 20);
            var isValidAge = rutil.validate.minAge(date, 18);
            console.log(isValidAge);

            expect(isValidAge).toBeTruthy();
        });

    });

    xdescribe("validate.zip", function() {

        it("should validate zip", function() {
            var zip = '12345-2453';
            var isValidZip = rutil.validate.zip(zip);
            console.log(isValidZip);

            expect(isValidZip).toBeTruthy();
        });

    });

    xdescribe("isValidName", function() {

        it("should validate name", function() {
            expect(rutil.isValidName('Foo')).toBeTruthy();
            expect(rutil.isValidName('Foo*')).toBeFalsy();
            expect(rutil.isValidName('Foo1')).toBeFalsy();
        });

    });

    xdescribe("isValidUsername", function() {

        it("should validate username", function() {
            expect(rutil.isValidUsername('foobar_')).toBeTruthy();
            expect(rutil.isValidUsername('foobar-')).toBeFalsy();
        });

    });

    xdescribe("isValidCoordinate", function() {
        it("should validate coordinate", function() {
            expect(rutil.isValidCoordinate(41.1029592)).toBeTruthy();
            expect(rutil.isValidCoordinate(-104.8049363)).toBeTruthy();
            expect(rutil.isValidCoordinate('13')).toBeFalsy();
        });
    });

    xdescribe("addCommas", function() {

        it("should add commas", function() {
            var number = 1234567890.1234;
            var numberWithCommas = rutil.addCommas(number);
            console.log(numberWithCommas);

            expect(numberWithCommas).toEqual('1,234,567,890.1234');
        });

    });

    xdescribe("merge", function() {

        it("should merge two objects", function() {
            var obj1 = {
                foo: 'bar',
            baz: 1234
            };

            var obj2 = {
                foo: 'qux'
            };

            var obj3 = rutil.merge(obj1, obj2);

            console.log(obj3);

            expect(obj3).toEqual({foo: 'qux', baz: 1234});
        });

    });

    xdescribe("isMobileDevice", function() {

        it("should check if is mobile device", function() {
            var isMobileDevice = rutil.isMobileDevice();
            console.log(isMobileDevice);
            expect(isMobileDevice).toMatch(/(true|false)/);
        });

        it("should check if is mobile device ios", function() {
            var isMobileDevice = rutil.isMobileDevice('ios');
            expect(isMobileDevice).toBeTruthy();
        });

        it("should check if is mobile device ios7", function() {
            var isMobileDevice = rutil.isMobileDevice('ios7');
            expect(isMobileDevice).toBeTruthy();
        });

        it("should check if is mobile device android", function() {
            var isMobileDevice = rutil.isMobileDevice('android');
            expect(isMobileDevice).toBeTruthy();
        });

    });

    xdescribe("toBool", function() {

        it("should return a boolean", function() {
            var str = '1';
            var bool = rutil.toBool(str);
            console.log(bool);
            expect(bool).toBeTruthy();
        });

    });

    xdescribe("shuffle", function() {

        it("should shuffle array", function() {
            var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
            var shuffled = rutil.shuffle(arr);
            console.log(arr);
            console.log(shuffled);
            expect(arr).not.toEqual(shuffled);
        });

    });

    xdescribe("random", function() {
        rutil.random = function(min, max) {
            var args = [].slice.call(arguments);
            if (args.length === 0) {
                throw new Error('Need at least one argument');
            }
            if (typeof max === 'undefined') {
                min = 0;
                max = args[0];
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        it("should return a random number", function() {
            var random = rutil.random(9);
            console.log(random);
            expect(random).toMatch(/[0-9]{1}/);

            random = rutil.random(0,9);
            console.log(random);
            expect(random).toMatch(/[0-9]{1}/);
        });

    });

    xdescribe("capitalize", function() {

        it("should capitalize string", function() {
            expect(rutil.capitalize('foo')).toEqual('Foo');
        });

        it("should lowercase string and uppercase first letter", function() {
            var string = 'fooBarQux';
            expect(rutil.capitalize(string)).toEqual('FooBarQux');
            expect(rutil.capitalize(string, true)).toEqual('Foobarqux');
        });

    });

    xdescribe("pad", function() {

        it("should pad number", function() {
            expect(rutil.pad(1)).toEqual(01);
            expect(rutil.pad(10, 2)).toEqual(0010);
        });

    });

    xdescribe("repeat", function() {

        it("should repeat string 5 times", function() {
            expect(rutil.repeat('a')).toEqual('aa');
            expect(rutil.repeat('foo', 5)).toEqual('foofoofoofoofoo');
        });

    });

    xdescribe("pad", function() {

        it("should pad number", function() {
            expect(rutil.pad(9)).toEqual('09');
        });

    });

    xdescribe("underscore", function() {
        it("underscore mixin", function() {
            function foo() {
               return 'foo';
            }
            _.mixin({'foo': foo});

            expect(_.foo()).toEqual('foo');
        });

        it("mixin", function() {

            _.mixin(rutil._());

            expect(_.isValidEmail('foo@bar.com')).toEqual(true);
        });

        it("mixin override", function() {

            rutil.random = function() {
                return true;
            };

            _.mixin(rutil._(true));

            expect(_.random()).toEqual(true);
        });
    });

});
