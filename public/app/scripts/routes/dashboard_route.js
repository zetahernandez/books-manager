BooksManager.DashboardRoute = BooksManager.Route.extend({
  redirect: function () {
    console.log('DashboardRoute.redirect');
    this.transitionTo('volumes.home');
  }
});