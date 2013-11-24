BooksManager.LoginView = Ember.View.extend({
  templateName: 'modal/login_modal',
  didInsertElement: function() {
    $('input[name=email]').focus();
  }
});