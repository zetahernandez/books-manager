BooksManager.User = Ember.Object.extend({
});
BooksManager.User.reopenClass({
  /**
   * [find current logged User]
   * @return {[type]} [description]
   */
  loggedUser: function () {
    return Ember.$.getJSON('/api/auth/loggedUser').then(function (user, textStatus) {
         return user ? BooksManager.User.create(user) : null;
    },function() {
    	return null;
    });
  }
});