BooksManager.Authentication = Ember.Object.extend({
  googleAuthResult: null,
  user: null,

  isAuthenticated: function () {
    return this.get('user');
  }.property('user'),

  loginGoogleCallback: function (authResult) {
    console.log(authResult);
    this.set('googleAuthResult', authResult);
  },

  signIn: function (email, password) {
    var _self = this;
    return Ember.$.post('/api/auth/signIn', {
      email: email,
      password: password
    }).then(function (response, textStatus) {
      if (!response.name || response.name === 'BadRequestError') {
        return false;
      } else {
        _self.set('user', BooksManager.User.create(response));
        return true;
      }

    });
  },
  signUp: function (email, password, username, name) {
    var _self = this;
    return Ember.$.post('/api/auth/signUp', {
      email: email,
      password: password,
      username: username,
      name: name
    }).then(function (response, textStatus) {
      if (!response.name || response.name === 'BadRequestError' || response.name === 'ValidationError') {
        return false;
      } else {
        _self.set('user', BooksManager.User.create(response));
        return true;
      }

    });
  }
});

BooksManager.auth = BooksManager.Authentication.create();