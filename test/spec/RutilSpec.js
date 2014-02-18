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

	describe("generateUUID", function() {
		it("should be be able to generate a UUID", function() {
			var uuid = rutil.generateUUID();
			console.log('uuid:', uuid);

			expect(uuid).not.toBe(null);
			expect(uuid).toMatch(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
		});
	});

	xdescribe("generateRandomSring", function() {
		it("should be be able to generate a random string", function() {
			var randomString = rutil.generateRandomString(16);
			console.log('Random string:', randomString);

			expect(randomString).not.toBe(null);
			expect(randomString).toMatch(/\w{16,32}/);
		});
	});
});
