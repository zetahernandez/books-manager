BooksManager.VolumesIndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('home');
	}
});