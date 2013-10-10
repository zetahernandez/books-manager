BooksManager.auth = Ember.Object.create({
    googleAuthResult: null,

    loginGoogleCallback: function(authResult) {
      console.log(authResult);
      this.set('googleAuthResult',authResult);
    }
});