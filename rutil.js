(function(global) {
    var rutil = (function(){

        'use strict';

        var rutil = {};

        /*
         * Objects
         */

        function isExisty(x) {
            return x != null;
        }

        function isTruthy(x) {
            return x;
        }

        function isFalsy(x) {
            return !isTruthy(x);
        }

        function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }

        function isString(str) {
            return typeof str === 'string';
        }

        function isNumber(n) {
            return typeof n === 'number';
        }

        function isFunction(f) {
            return typeof f === 'function';
        }

        function isBoolean(bool) {
            return typeof bool === 'boolean';
        }

        function isObject(obj, any) {
            var isObject = (Object.prototype.toString.call(obj) === '[object Object]');
            if (any) {
                isObject = (typeof obj === 'object');
            }
            return isObject;
        }

        function isEmpty(obj) {
            if (!isExisty(obj)) return true;
            if (isArray(obj)) return obj.length === 0;
            if (isObject(obj)) return Object.keys(obj).length === 0;
            if (isString(obj)) return obj.length === 0;
            return false;
        }

        function forOwn(obj, func) {
           var k;
           for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    func(obj[k], k);
                }
           }
        }

        function noop() {}

        function functor(v) {
            return typeof v === 'function' ? v : function() { return v; };
        }

        function result(target, prop) {
            if (isFunction(target[prop])) {
                return target[prop]();
            }
            return target[prop];
        }

        function nth(ary, index) {
            return ary[index];
        }

        function first(ary) {
            return nth(toArray(ary), 0);
        }

        function last(ary) {
            var a = toArray(ary);
            return nth(a, size(a) - 1);
        }

        function rest(ary) {
            var a = toArray(ary);
            a.shift();
            return a;
        }

        function isIndexed(data) {
            return isArray(data) || isString(data);
        }

        function merge(obj1, obj2){
            var obj3 = {},
            attrname;
            for (attrname in obj1) {
                obj3[attrname] = obj1[attrname];
            }
            for (attrname in obj2) {
                obj3[attrname] = obj2[attrname];
            }
            return obj3;
        }

        function serialize(obj, prefix) {
            var s = function(obj, prefix) {
                var str = [];
                for(var p in obj) {
                    var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
                    if (v !== undefined && v !== null) {
                        var set;
                        if (isObject(v)) {
                            set = s(v, k);
                            str.push(set);
                        } else if (isArray(v)) {
                            v.forEach(function(n) {
                                set = encodeURIComponent(k) + '=' + encodeURIComponent(n);
                                str.push(set);
                            });
                        } else {
                            set = encodeURIComponent(k) + '=' + encodeURIComponent(v);
                            str.push(set);
                        }
                    }
                }
                return str.join('&');
            };
            return s(obj, prefix);
        }

        /**
         * Arrays
         */

        function toArray(a) {
            return [].slice.call(a);
        }

        function flatten(ary) {
            return [].concat.apply([], Array.isArray(ary) ? ary.map(function(item) {
                return Array.isArray(item) ? flatten(item) : item;
            }) : [ary]);
        }

        function prop(obj) {
            return function(name) {
                return obj[name];
            };
        }

        function sum(/* args */) {
            return reduce(flatten([].slice.call(arguments)), function (acc, n) {
                return acc += n;
            }, 0);
        }

        function size(x) {
            if (isArray(x)) return x.length;
            if (isObject(x)) return Object.keys(x).length;
            return x.length;
        }

        function avg(array) {
            var sum = reduce(array, function(a, b) {
                return a + b;
            });
            return sum / size(array);
        }

        function int(x) {
            return parseInt(x, 10);
        }

        function string(x) {
            return ''+x;
        }

        function idenity(x) {
            return x;
        }

        function compactObject(obj) {
            forOwn(obj, function(val, key) {
                if (isEmpty(val)) delete obj[key];
            });
            return obj;
        }

        function comparator(pred) {
            return function(x, y) {
                if (pred(x, y)) {
                    return -1;
                } else if (pred(y, x)) {
                    return 1;
                } else {
                    return 0;
                }
            };
        }

        function complement(pred) {
            return function() {
                return !pred.apply(null, toArray(arguments));
            };
        }

        function doWhen(cond, action) {
            if (isTruthy(cond)) {
                return action();
            } else {
                return undefined;
            }
        }

        function executeIfHasField(target, name) {
            return doWhen(isExisty(target[name]), function() {
                var result = result(target, name);
                return result;
            });
        }

        function createPixel(url, cb) {
            var postImage = document.createElement('img');
            postImage.style.visibility = 'hidden';
            postImage.style.width = '0px';
            postImage.style.height = '0px';
            postImage.src = url;
            postImage.onload = function() {
                postImage.src = '';
                cb && cb(null, url);
            };
            postImage.onerror = function(e) {
                cb && cb(e, url);
            };
            document.body.appendChild(postImage);
        }

        function getParams(url) {
            var params;
            try {
                var prmstr = window.location.search.substr(1);
                if (url) {
                    prmstr = url.split('?')[1];
                }
                var prmarr = prmstr.split('&');
                if (prmarr[0]) {
                    params = [];
                    for (var i = 0; i < prmarr.length; i++) {
                        var tmparr = prmarr[i].split('=');
                        params[tmparr[0]] = tmparr[1];
                    }
                }
            } catch(err) {}
            return params;
        }

        function setQueryStringParam(uri, key, value) {
            var regex = new RegExp('([?|&])' + key + '=.*?(&|#|$)', 'i');
            var separator = uri.indexOf('?') !== -1 ? '&' : '?';
            if (regex.test(uri)) {
                return uri.replace(regex, '$1' + key + '=' + value + '$2');
            } else {
                return uri + separator + key + '=' + value;
            }
        }

        /**
        * http://stackoverflow.com/a/2117523
        */
        function generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }

        function generateRandomString(length, chars) {
            var str = [],
            i;
            length = length || 32;
            chars = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (i = 0; i < length; i++) {
                str.push(chars.charAt(Math.floor(Math.random() * chars.length)));
            }
            return str.join('');
        }

        function hexToRgb(hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        /**
        * Returns an array of dates between the two dates
        */
        function getDatesInbetween(startDate, endDate) {
            var dates = [],
            currentDate = startDate,
            addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
            while (currentDate <= endDate) {
                dates.push(currentDate);
                currentDate = addDays.call(currentDate, 1);
            }
            return dates;
        }

        function isDateInRange(start, stop, now) {
            return (now.valueOf() >= start.valueOf() && now.valueOf() <= stop.valueOf()) ? true : false;
        }

        function isMobileDevice(device) {
            device = device || '';
            var regex = '';
            switch(device.toLowerCase()) {
                case 'android':
                    regex = new RegExp('Android', 'i');
                    break;
                case 'webos':
                    regex = new RegExp('webOS', 'i');
                    break;
                case 'iphone':
                    regex = new RegExp('iPhone', 'i');
                    break;
                case 'ipad':
                    regex = new RegExp('iPad', 'i');
                    break;
                case 'ios':
                    regex = new RegExp('(iPhone|iPad)', 'i');
                    break;
                case 'ios7':
                    regex = new RegExp('(iPad|iPhone);.*CPU.*OS 7_\\d', 'i');
                    break;
                case 'blackberry':
                    regex = new RegExp('BlackBerry', 'i');
                    break;
                case 'ie':
                    regex = new RegExp('IEMobile', 'i');
                    break;
                case 'opera':
                    regex = new RegExp('Opera Mini', 'i');
                    break;
                default:
                    regex = new RegExp('(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)', 'i');
                    break;
            }
            return regex.test(navigator.userAgent);
        }

        function sleep(ms) {
            var startTime = new Date().getTime();
            while (new Date().getTime() < startTime + ms);
        }

        function parseHashtag(str, url) {
            return str.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
                var tmpUrl = url;
                var tag = t.replace('#','%23');
                tmpUrl = tmpUrl.replace(/\{\{\w+\}\}/g, tag);
                return t.link(tmpUrl);
            });
        }

        function parseUsername(str, url) {
            return str.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
                var tmpUrl = url;
                var username = u.replace('@','');
                tmpUrl = tmpUrl.replace(/\{\{\w+\}\}/g, username);
                return u.link(tmpUrl);
            });
        }

        function parseUrl(str) {
            return str.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
                return url.link(url);
            });
        }

        function stripTags(str) {
            return (str? str.replace(/(<([^>]+)>)/ig, '') : str);
        }

        function formatPhone(number) {
            return (number ? number.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : number);
        }

        function validateEmail(email) {
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return (email ? regex.test(email) : false);
        }

        function validateMinAge(birthDate, minAge) {
            var tmpDate = new Date(birthDate.getFullYear() + minAge, birthDate.getMonth(), birthDate.getDate()).setMonth(birthDate.getMonth() - 1);
            return (tmpDate <= new Date());
        }

        function validateZip(zip) {
            var regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
            return regex.test(zip);
        }

        function validateUsername(username) {
            var regex = /^[a-zA-Z0-9_]+$/;
            return regex.test(username);
        }

        function validateName(name) {
            var regex = /^[a-zA-Z-' ]*$/;
            return regex.test(name);
        }

        function isValidCoordinate(coord) {
            if (!isNumber(coord)) return false;
            return /^(\-?\d+(\.\d+)?)$/.test(coord);
        }

        function addCommas(n) {
            if (!n) return n;
            var parts = n.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        }

        function toBool(str) {
            switch((str ? str.toLowerCase() : '')) {
                case 'true': case 'yes': case 'on': case '1': return true;
                default: return false;
            }
        };

        function prettyDate(date) {
            date.setMonth(date.getMonth() - 1);
            var dayNames = [
                'Sunday', 'Monday', 'Tuesday',
                'Wednesday', 'Thursday', 'Friday',
                'Saturday'
            ];
            var monthNames = [
                'January', 'February', 'March',
                'April', 'May', 'June',
                'July', 'August', 'September',
                'October', 'November', 'December'
            ];
            return dayNames[date.getDay()] + ' ' + monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
        };

        // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        function shuffle(arr) {
            var array = [].slice.call(arr) || [];
            var currentIndex = array.length,
            temporaryValue,
            randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        function random(min, max) {
            var args = [].slice.call(arguments);
            if (args.length === 0) {
                throw new Error('Need at least one argument');
            }
            if (typeof max === 'undefined') {
                min = 0;
                max = args[0];
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function repeat(str, times) {
            times = times || 2;
            return Array(times + 1).join(str);
        }

        function pad(num) {
            return ((num < 10 ? '0' : '') + num);
        }

        function capitalize(str, lower) {
            return (lower ? str.toLowerCase() : str).replace(/(?:^|\s)\S/g, function(a) {
                return a.toUpperCase();
            });
        }

        function every(ary, fun) {
            return ary.every(fun);
        }

        function some(ary, fun) {
            return ary.some(fun);
        }

        function map(ary, fun) {
            return ary.map(fun);
        }

        function filter(ary, fun) {
            return ary.filter(fun);
        }

        function reduce(ary, fun) {
            return ary.reduce(fun);
        }

        function preCondition(array, success, fail) {
            if (every(array, isTruthy)) {
                functor(success)();
                return true;
            } else {
                functor(fail)();
                return false;
            }
        };

        function addEvent(element, eventName, func) {
            if (element.addEventListener) {
                return element.addEventListener(eventName, func, false);
            } else if (element.attachEvent) {
                return element.attachEvent("on" + eventName, func);
            }
        };

        function textNode() {
            return document.createTextNode.bind(document)();
        };

        function wrap(elementType) {
            return function(child) {
                var parent = document.createElement(elementType);
                parent.appendChild(child);
                return parent;
            };
        };

        function append(parent, child) {
            parent.appendChild(child);
            return parent;
        };

        function hasClass(elem, className) {
            return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
        };

        function addClass(elem, className) {
            if (!hasClass(elem, className)) {
                elem.className += ' ' + className;
            }
        };

        function removeClass(elem, className) {
            var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
            if (hasClass(elem, className)) {
                while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
                    newClass = newClass.replace(' ' + className + ' ', ' ');
                }
                elem.className = newClass.replace(/^\s+|\s+$/g, '');
            }
        };

        function setAttributes(el, attrs) {
            attrs = (typeof attrs === 'object' ? attrs : {});
            forOwn(attrs, function(k, v) {
                el.setAttribute(k, v);
            });
            return el;
        }

        function appendStylesheet(url, callback) {
            var linkTag = document.createElement('link');
            setAttributes(linkTag, {
                href: url,
                type: 'text/css',
                rel: 'stylesheet'
            });
            if (callback) {
                addEvent(linkTag, 'load', callback);
            }
            append(document.getElementsByTagName('head')[0], linkTag);
        }

        function appendScript(url) {
            var scriptTag = createElement('script', {
                src: url,
                type: 'script/javascript'
            });
            append(document.getElementsByTagName('head')[0], scriptTag);
        }

        function remove(el) {
            return el.parentElement.removeChild(el);
        }

        function htmlContents(el) {
            var div = createElement('div');
            var contents = append(div, el).innerHTML;
            remove(div);
            return contents;
        }

        function elementById(id) {
            return document.getElementById(id);
        }

        function createElement(type, attributes) {
            var el = document.createElement(type);
            setAttributes(el, attributes);
            return el;
        }

        function anchor(url, external) {
            var a = document.createElement('a');
            a.href = url;
            if (isObject(external)) {
                setAttributes(a, external);
            } else if (isTruthy(external)){
                a.target = '_blank';
            }
            return a;
        }

        function image(imageUrl, alt) {
            var img = document.createElement('img');
            img.src = imageUrl;
            if (isObject(alt)) {
                setAttributes(el, alt);
            } else {
                img.alt = alt || '';
            }
            return img;
        }

        var _ = function(override) {
            var mixinObj = {};
            for (var k in rutil) {
                if (rutil.hasOwnProperty(k)) {
                    var exists = _ !== 'undefined' && _[k];
                    if (!override && exists) {
                        return;
                    }
                    mixinObj[k] = rutil[k];
                }
            }
            delete mixinObj.rutil;
            delete mixinObj.validate;
            delete mixinObj._;
            return mixinObj;
        };

        // Validators
        rutil.isTruthy = isTruthy;
        rutil.isFalsy = isFalsy;
        rutil.isArray = isArray;
        rutil.isString = isString;
        rutil.isNumber = isNumber;
        rutil.isObject = isObject;
        rutil.isBoolean = rutil.isBool = isBoolean;
        rutil.isFunction = isFunction;
        rutil.isEmpty = isEmpty;
        rutil.isExisty = isExisty;

        // Converters
        rutil.toBoolean = rutil.toBool = rutil.bool = toBool;
        rutil.toInt = rutil.int = int;
        rutil.toString = rutil.string = string;

        // Utils
        rutil.identity = idenity;
        rutil.merge = merge;
        rutil.prop = rutil.property = prop;
        rutil.serialize = serialize;
        rutil.hexToRgb = hexToRgb;
        rutil.sleep = sleep;

        // Array functions
        rutil.shuffle = shuffle;
        rutil.flatten = rutil.flat = flatten;
        rutil.nth = nth;
        rutil.first = first;
        rutil.last = last;
        rutil.rest = rest;
        rutil.isIndexed = isIndexed;
        rutil.reduce = reduce;
        rutil.map = map;
        rutil.filter = filter;
        rutil.some = some;
        rutil.every = every;
        rutil.size = size;
        rutil.toArray = toArray;

        // Number functions
        rutil.random = random;
        rutil.sum = sum;
        rutil.average = rutil.avg = avg;

        // Object functions
        rutil.forOwn = forOwn;
        rutil.compactObject = compactObject;
        rutil.result = result;
        rutil.executeIfHasField = executeIfHasField;

        // Function functions
        rutil.functor = functor;
        rutil.noop = noop;
        rutil.comparator = comparator;

        // Helpers
        rutil.preCondition = rutil.preCond = preCondition;
        rutil.doWhen = doWhen;
        rutil.complement = complement;

        // Date functions
        rutil.getDatesInbetween = getDatesInbetween;
        rutil.isDateInRange = isDateInRange;

        // String functions
        rutil.addCommas = addCommas;
        rutil.prettyDate = prettyDate;
        rutil.repeat = repeat;
        rutil.pad = pad;
        rutil.capitalize = capitalize;
        rutil.formatPhone = formatPhone;
        rutil.generateUUID = generateUUID;
        rutil.generateRandomString = generateRandomString;

        // String validation
        rutil.validate = {
            email: validateEmail,
            minAge: validateMinAge,
            zip: validateZip
        };
        rutil.isValidEmail = validateEmail;
        rutil.isValidMinAge = validateMinAge;
        rutil.isValidZip = validateZip;
        rutil.isValidUsername = validateUsername;
        rutil.isValidName = validateName;
        rutil.isValidCoordinate = rutil.isValidCoord = isValidCoordinate;

        // DOM functions
        rutil.addEvent = addEvent;
        rutil.createPixel = createPixel;
        rutil.createElement = createElement;
        rutil.textNode = textNode;
        rutil.image = rutil.imageElement = image;
        rutil.anchor = rutil.anchorElement = anchor;
        rutil.remove = remove;
        rutil.getParams = getParams;
        rutil.setQueryStringParam = setQueryStringParam;
        rutil.parseHashtag = parseHashtag;
        rutil.parseUsername = parseUsername;
        rutil.parseUrl = parseUrl;
        rutil.isMobileDevice = isMobileDevice;
        rutil.stripTags = stripTags;
        rutil.wrap = wrap;
        rutil.append = append;
        rutil.elementById = elementById;
        rutil.hasClass = hasClass;
        rutil.addClass = addClass;
        rutil.removeClass  = removeClass;
        rutil.setAttributes = setAttributes;
        rutil.appendStylesheet = appendStylesheet;
        rutil.appendScript = appendScript;
        rutil.htmlContents = htmlContents;

        rutil._ = _;

        return rutil;

    })();

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = rutil;
        }
        exports.rutil = rutil;
    } else if (typeof define === 'function' && define.amd) {
        define([], function() {
            return rutil;
        });
    } else {
        global.rutil = global._r = rutil;
    }
})(this);
