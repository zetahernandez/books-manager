var BooksManager = window.BooksManager = Ember.Application.create({
  LOG_TRANSITIONS: true
});
if (!window.derivateGoogleAuth) {
  //create globalfunction used in span button 
  //this is a callback of google authentication, derive it to  BooksManager.auth.loginGoogleCallback
  window.derivateGoogleAuth = function (authResult) {
    BooksManager.auth.loginGoogleCallback(authResult);
  };
}
/* Order and include as you please. */
require('helpers/**/*');
require('scripts/models/**/*');
require('scripts/routes/**/*');
require('scripts/controllers/**/*');
require('scripts/views/**/*');
require('scripts/router');