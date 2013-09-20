BooksManager.ApplicationRoute = Ember.Route.extend({
  renderTemplate: function () {
    console.log('ApplicationRoute.renderTemplate');
    this._super();
  }
});