BooksManager.LoginController = Ember.ObjectController.extend({
  show: false,
  /**
   * computed property used in header_template to show or hide modal
   * 
   * @return undefined
   */
  showLogin: function () {
    return this.get('show');
  }.property('show'),

  actions: {
    /**
     * action used in header_template to change state of show property
     * @return undefined
     */
    showLoginModal: function () {
      this.set('show', true);
    },
    /**
     * action called in login_modal, this action SignIn an user 
     * @return undefined
     */
    signIn: function () {
      console.log('login');
    }
  }
});