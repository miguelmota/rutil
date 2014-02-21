(function(global){

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

	var serialize = function(obj, prefix) {
		var s = function(obj, prefix) {
			var str = [];
			for(var p in obj) {
				var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
				if (v !== null) {
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

	var isMobileDevice = function() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	};

	var sleep = function(ms) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + ms);
	};

	var parseHashtag = function(string, url) {
		return string.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
			var tmpUrl = url;
			var tag = t.replace('#','%23');
			tmpUrl = tmpUrl.replace(/\{\{\w+\}\}/g, tag);
			return t.link(tmpUrl);
		});
	};

	var parseUsername = function(string, url) {
		return string.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
			var tmpUrl = url;
			var username = u.replace('@','');
			tmpUrl = tmpUrl.replace(/\{\{\w+\}\}/g, username);
			return u.link(tmpUrl);
		});
	};

	var parseUrl = function(string) {
		return string.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
			return url.link(url);
		});
	};

	var stripTags = function(string) {
		return (string ? string.replace(/(<([^>]+)>)/ig, '') : string);
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

	rutil.isArray = isArray;
	rutil.isObject = isObject;
	rutil.serialize = serialize;
	rutil.createPixel = createPixel;
	rutil.getParams = getParams;
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

	global.rutil = global.rutil || rutil;

})(window);
