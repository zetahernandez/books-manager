BooksManager.IndexRoute = Ember.Route.extend({
  redirect: function () {
    this.transitionTo('volumes');
  },
  renderTemplate: function (controller, model) {
    // categories = BooksManager.Volume.findAll(),
    console.log("render index");

    // categoryListController.set('model', categories);

    this.render('index');
    this.render('header', {
      outlet: 'header',
      into: 'index'
    });
  }
});