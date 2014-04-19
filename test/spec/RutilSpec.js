var _ = require('lodash');
var rutil = require('../../rutil');

describe("Rutil", function() {

    xdescribe("getParams", function() {

        xit("should be able to get params from window url", function() {
            var params = rutil.getParams();
            if (!params) {
                var url = window.location + '?foo=bar';
                window.history.pushState('test', 'Title', url);
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
        xit("should update query string param", function() {
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
        xit("should be be able to generate a random 32 char string", function() {
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

        xit("should check if is mobile device", function() {
            var isMobileDevice = rutil.isMobileDevice();
            console.log(isMobileDevice);
            expect(isMobileDevice).toMatch(/(true|false)/);
        });

        xit("should check if is mobile device ios", function() {
            var isMobileDevice = rutil.isMobileDevice('ios');
            expect(isMobileDevice).toBeTruthy();
        });

        it("should check if is mobile device ios7", function() {
            var isMobileDevice = rutil.isMobileDevice('ios7');
            expect(isMobileDevice).toBeTruthy();
        });

        xit("should check if is mobile device android", function() {
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

        xit("should capitalize string", function() {
            expect(rutil.capitalize('foo')).toEqual('Foo');
        });

        it("should lowercase string and uppercase first letter", function() {
            var string = 'fooBarQux';
            expect(rutil.capitalize(string)).toEqual('FooBarQux');
            expect(rutil.capitalize(string, true)).toEqual('Foobarqux');
        });

    });

    xdescribe("pad", function() {

        xit("should pad number", function() {
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
        xit("underscore mixin", function() {
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

        xit("mixin override", function() {

            rutil.random = function() {
                return true;
            };

            _.mixin(rutil._(true));

            expect(_.random()).toEqual(true);
        });
    });

});
