BooksManager.SettingsGeneralRoute = Ember.Route.extend({
	renderTemplate: function () {
		this.render('settingsGeneral', {
			outlet: 'center',
			into: 'settings'
		});
	}
});