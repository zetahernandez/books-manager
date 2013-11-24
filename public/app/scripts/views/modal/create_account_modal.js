BooksManager.CreateAccountView = Ember.View.extend({
  templateName: 'modal/create_account_modal',
  didInsertElement: function() {
    $('input[name=email]').focus();
  }
});