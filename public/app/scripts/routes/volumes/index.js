BooksManager.VolumesIndexRoute = Ember.Route.extend({
  redirect: function () {
    this.transitionTo('home');
  },
  renderTemplate: function () {
    console.log('VolumesIndexRoute.renderTemplate');
    this._super();
  }
});