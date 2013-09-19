var BooksManager = window.BooksManager = Ember.Application.create({
  LOG_TRANSITIONS: true
});
var Bootstrap = window.Bootstrap = Ember.Namespace.create();
/* Order and include as you please. */
require('scripts/models/**/*');
require('scripts/routes/**/*');
require('scripts/controllers/**/*');
require('scripts/views/**/*');
require('scripts/router');