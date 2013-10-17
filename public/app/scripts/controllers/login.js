BooksManager.LoginController = Ember.ObjectController.extend({
  show: false,
  isSignUp: false,
  email: null,
  password: null,
  confirmPassword: null,
  username: null,
  name: null,
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

    showSignUp: function () {
      this.set('isSignUp', true);
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
          //TODO: send hide to view
          Ember.$('#myModal').modal('hide');
        } else {
          console.log('show error');
        }
      });

    },

    /**
     * action called in login_modal, this action signUp an user
     * @return undefined
     */
    signUp: function () {
      var _self = this;
      BooksManager.auth.signUp(this.get('email'), this.get('password'), this.get('username'), this.get('name')).then(function (result) {
        //When done
        if (result) {
          //TODO: send hide to view
          Ember.$('#myModal').modal('hide');
        } else {
          //TODO: 
          console.log('show error');
        }
      });

    },

    closeLogin: function () {
      this.set('show', false);
      this.set('isSignUp', false);
    }

  }
});