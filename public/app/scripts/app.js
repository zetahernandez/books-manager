var BooksManager = window.BooksManager = Ember.Application.create({
  LOG_TRANSITIONS: true
});
//TODO: Move to global
$(document).click(function (e) {
  if (($('.popover').has(e.target).length == 0) || $(e.target).is('.close')) {
    $('#popover-element').popover('hide');
  }
});

/* Order and include as you please. */
require('scripts/models/**/*');
require('scripts/routes/**/*');
require('scripts/controllers/**/*');
require('scripts/views/**/*');
require('scripts/router');