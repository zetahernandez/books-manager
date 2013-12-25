BooksManager.VolumesRoute = BooksManager.Route.extend({

  setupController: function(controller) {
    //The first time the active tab is home
    controller.set('activeTab', 'home');
  },

  renderTemplate: function() {
    console.log('VolumesRoute.renderTemplate');
    this._super();
  },

  actions: {
    /**
     * When recived the selectedTab action, setup the selected tab in
     * the property activeTab for volumesController
     * @param  String name the name of tab
     * @return void
     */
    selectTab: function(name) {
      this.controllerFor('volumes').set('activeTab', name);
      this.transitionTo('volumes.' + name);
    }
  }
});