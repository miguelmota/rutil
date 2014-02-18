describe("Rutil", function() {

	xdescribe("getParams", function() {

		it("should be able to get params from window url", function() {
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
});
