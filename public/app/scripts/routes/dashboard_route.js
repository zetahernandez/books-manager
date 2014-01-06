BooksManager.DashboardRoute = BooksManager.Route.extend({
  model: function() {
    return BooksManager.User.loggedUser();
  },

  redirect: function(user) {
    console.log(user);
    if (user) {
      BooksManager.auth.set('user', user);
      this.transitionTo('myhome');
    } else {
      console.log('DashboardRoute.redirect');
      this.transitionTo('volumes.home');
    }
  }
});