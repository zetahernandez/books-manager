BooksManager.IndexRoute = Ember.Route.extend({
  redirect : function() {
    this.transitionTo('volumes.home');
  }
});