BooksManager.VolumesHomeRoute = BooksManager.Route.extend({
  // activate: function() {},
  // deactivate: function() {},
  // setupController: function(controller, model) {},
  model: function() {
    return BooksManager.Volume.findAll();
  },

  renderTemplate: function() {
    console.log('VolumesHomeRoute.renderTemplate');
    this._super();
  }
  // beforeModel: function() {},
  // afterModel: function() {},  
});
