BooksManager.PopoverConteinerView = Ember.View.extend({
  classNames: ["popover-container"],


  didInsertElement: function () {
    console.log("PopoverConteinerView");
  },
  eventManager: Ember.Object.create({
    // mouseLeave: function (event, view) {
    //   console.log('VAS');
    //   $('img[data-toggle="popover"]').popover('hide');
    // }
  })
});