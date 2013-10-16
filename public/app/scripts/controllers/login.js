BooksManager.LoginController = Ember.ObjectController.extend({
  show: false,
  email: null,
  password: null,
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
      var _self = this;
      BooksManager.auth.signIn(this.get('email'), this.get('password')).then(function (result) {
        //When done
        if (result) {
          console.log(result);
          Ember.$('#myModal').modal('hide');
        } else {
          console.log('show error');
        }
      });

    },
    closeLogin: function (e) {
      console.log(e);
      this.set('show', false);
    }
  }
});