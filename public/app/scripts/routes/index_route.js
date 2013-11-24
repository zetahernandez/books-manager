BooksManager.IndexRoute = BooksManager.Route.extend({
  /**
   * When redirect a Route not render template
   * @return {[type]} [description]
   */
  redirect: function () {
    console.log('IndexRoute.redirect');
    this.transitionTo('volumes.home');
  },
 
  renderTemplate: function () {
    console.log('IndexRoute.renderTemplate');
    this._super();
  }
});