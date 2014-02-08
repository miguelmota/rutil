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
		} catch(err) {
			console.error(err);
		}
		return params;
	};

	rutil.isArray = isArray;
	rutil.isObject = isObject;
	rutil.serialize = serialize;
	rutil.createPixel = createPixel;
	rutil.getParams = getParams;

	global.rutil = global.rutil || rutil;

})(window);
