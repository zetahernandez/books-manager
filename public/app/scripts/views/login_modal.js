BooksManager.LoginModalView = Ember.View.extend({
  templateName: 'login_modal',
  didInsertElement: function () {
    this.$('#myModal').modal();
    console.log(this.controller);

    gapi.signin.render('myGoogleButton', {
      'accesstype': 'online',
      'approvalprompt': 'auto',
      'callback': 'derivateGoogleAuth',
      'clientid': '47308671096.apps.googleusercontent.com',
      'cookiepolicy': 'single_host_origin',
      'requestvisibleactions': 'http://schemas.google.com/AddActivity',
      'scope': 'https://www.googleapis.com/auth/userinfo.email',
      'theme': 'dark',
      'width': 'standard'
    });
  },
});