var BooksManager = window.BooksManager = Ember.Application.create({
	LOG_TRANSITIONS: true,


	getURL: function(url) {
		// If it's a non relative URL, return it.
		if (url.indexOf('http') === 0) return url;

		var u = (BooksManager.BaseUri === undefined ? "/" : BooksManager.BaseUri);
		if (u[u.length - 1] === '/') {
			u = u.substring(0, u.length - 1);
		}
		if (url.indexOf(u) !== -1) return url;
		return u + url;
	},
	authComplete: function(state, user) {
		// TODO, how to dispatch this to the controller without the container?
    var loginController = BooksManager.__container__.lookup('controller:login');
    return loginController.authenticationComplete(state, user);
	}
});
/* Order and include as you please. */
require('helpers/**/*');
require('scripts/models/**/*');
require('scripts/routes/**/*');
require('scripts/controllers/**/*');
require('scripts/views/**/*');