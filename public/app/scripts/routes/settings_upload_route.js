BooksManager.SettingsUploadRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('uploadBooks', {
      outlet: 'settingContent',
      into: 'settings'
    });
  }
});