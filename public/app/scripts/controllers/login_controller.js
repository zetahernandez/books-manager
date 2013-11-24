BooksManager.LoginController = Ember.ObjectController.extend({
  email: null,
  password: null,
  confirmPassword: null,
  username: null,
  name: null,


  actions: {


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