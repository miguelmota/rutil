(function(global) {
    var rutil = (function(){

        'use strict';

        var rutil = {};

        var isArray = function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        };

        var isObject = function(obj, isArray) {
            var isObject = (Object.prototype.toString.call(obj) === '[object Object]');
            if (isArray) {
                isObject = (typeof obj === 'object');
            }
            return isObject;
        };

        var merge = function(obj1, obj2){
            var obj3 = {},
            attrname;
            for (attrname in obj1) {
                obj3[attrname] = obj1[attrname];
            }
            for (attrname in obj2) {
                obj3[attrname] = obj2[attrname];
            }
            return obj3;
        };

        var serialize = function(obj, prefix) {
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
        };

        var createPixel = function(url, cb) {
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
        };

        var getParams = function(url) {
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
        };

        var setQueryStringParam = function(uri, key, value) {
            var regex = new RegExp('([?|&])' + key + '=.*?(&|#|$)', 'i');
            var separator = uri.indexOf('?') !== -1 ? '&' : '?';
            if (regex.test(uri)) {
                return uri.replace(regex, '$1' + key + '=' + value + '$2');
            } else {
                return uri + separator + key + '=' + value;
            }
        };

        /**
        * http://stackoverflow.com/a/2117523
        */
        var generateUUID = function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        };

        var generateRandomString = function(length, chars) {
            var str = [],
            i;
            length = length || 32;
            chars = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (i = 0; i < length; i++) {
                str.push(chars.charAt(Math.floor(Math.random() * chars.length)));
            }
            return str.join('');
        };

        var hexToRgb = function(hex) {
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
        };

        /**
        * Returns an array of dates between the two dates
        */
        var getDatesInbetween = function(startDate, endDate) {
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
        };

        var isMobileDevice = function(device) {
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
        };

        var sleep = function(ms) {
            var startTime = new Date().getTime();
            while (new Date().getTime() < startTime + ms);
        };

        var parseHashtag = function(str, url) {
            return str.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
                var tmpUrl = url;
                var tag = t.replace('#','%23');
                tmpUrl = tmpUrl.replace(/\{\{\w+\}\}/g, tag);
                return t.link(tmpUrl);
            });
        };

        var parseUsername = function(str, url) {
            return str.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
                var tmpUrl = url;
                var username = u.replace('@','');
                tmpUrl = tmpUrl.replace(/\{\{\w+\}\}/g, username);
                return u.link(tmpUrl);
            });
        };

        var parseUrl = function(str) {
            return str.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
                return url.link(url);
            });
        };

        var stripTags = function(str) {
            return (str? str.replace(/(<([^>]+)>)/ig, '') : str);
        };

        var formatPhone = function(number) {
            return (number ? number.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : number);
        };

        var validateEmail = function(email) {
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return (email ? regex.test(email) : false);
        };

        var validateMinAge = function(birthDate, minAge) {
            var tmpDate = new Date(birthDate.getFullYear() + minAge, birthDate.getMonth(), birthDate.getDate()).setMonth(birthDate.getMonth() - 1);
            return (tmpDate <= new Date());
        };

        var validateZip = function(zip) {
            var regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
            return regex.test(zip);
        };

        var validateUsername = function(username) {
            var regex = /^[a-zA-Z0-9_]+$/;
            return regex.test(username);
        };

        var validateName = function(name) {
            var regex = /^[a-zA-Z-' ]*$/;
            return regex.test(name);
        };

        var addCommas = function(n) {
            if (!n) return n;
            var parts = n.toString().split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return parts.join('.');
        };

        var toBool = function(str) {
            switch((str ? str.toLowerCase() : '')) {
                case 'true': case 'yes': case 'on': case '1': return true;
                default: return false;
            }
        };

        var prettyDate = function(date) {
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
        var shuffle = function(arr) {
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
        };

        var random = function(min, max) {
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

        var repeat = function(str, times) {
            times = times || 2;
            return Array(times + 1).join(str);
        };

        var pad = function (num) {
            return ((num < 10 ? '0' : '') + num);
        };

        var capitalize = function(str, lower) {
            return (lower ? str.toLowerCase() : str).replace(/(?:^|\s)\S/g, function(a) {
                return a.toUpperCase();
            });
        };

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

        rutil.isArray = isArray;
        rutil.isObject = isObject;
        rutil.merge = merge;
        rutil.serialize = serialize;
        rutil.createPixel = createPixel;
        rutil.getParams = getParams;
        rutil.setQueryStringParam = setQueryStringParam;
        rutil.generateUUID = generateUUID;
        rutil.generateRandomString = generateRandomString;
        rutil.hexToRgb = hexToRgb;
        rutil.getDatesInbetween = getDatesInbetween;
        rutil.isMobileDevice = isMobileDevice;
        rutil.sleep = sleep;
        rutil.parseHashtag = parseHashtag;
        rutil.parseUsername = parseUsername;
        rutil.parseUrl = parseUrl;
        rutil.stripTags = stripTags;
        rutil.formatPhone = formatPhone;
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
        rutil.addCommas = addCommas;
        rutil.prettyDate = prettyDate;
        rutil.toBool = toBool;
        rutil.shuffle = shuffle;
        rutil.random = random;
        rutil.repeat = repeat;
        rutil.pad = pad;
        rutil.capitalize = capitalize;
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
        global.rutil = rutil;
    }
})(this);
