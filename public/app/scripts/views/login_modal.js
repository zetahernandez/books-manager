BooksManager.LoginModalView = Ember.View.extend({
  templateName: 'login_modal',
  didInsertElement: function () {
    Ember.$('#myModal').modal('show');

    var self = this;
    Ember.$('#myModal').on('hidden.bs.modal', function () {
      self.get('controller').send('closeLogin');
    });
    $('input[name=email]').focus();
    // gapi.signin.render('myGoogleButton', {
    //   'accesstype': 'online',
    //   'approvalprompt': 'auto',
    //   'callback': 'derivateGoogleAuth',
    //   'clientid': '47308671096.apps.googleusercontent.com',
    //   'cookiepolicy': 'single_host_origin',
    //   'requestvisibleactions': 'http://schemas.google.com/AddActivity',
    //   'scope': 'https://www.googleapis.com/auth/userinfo.email',
    //   'theme': 'dark',
    //   'width': 'standard'
    // });
  },
  willDestroyElement: function () {

    Ember.$('#myModal').off('hidden.bs.modal');
    Ember.$('#myModal').modal('hide');
  }

});