BooksManager.MyHomeIndexRoute = BooksManager.Route.extend({
  model: function() {
    return BooksManager.Volume.findAll();
  },
  renderTemplate: function () {
    console.log('MyHomeIndexRoute.renderTemplate');
    this._super();
  }
});