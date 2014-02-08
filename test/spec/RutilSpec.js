describe("Rutil", function() {

	describe("getParams", function() {

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
});
