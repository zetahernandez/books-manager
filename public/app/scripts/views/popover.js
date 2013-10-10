BooksManager.PopoverConteinerView = Ember.View.extend({
  classNames: ["popover_container"],


  didInsertElement: function () {
   
  },
  eventManager: Ember.Object.create({
    // mouseLeave: function (event, view) {
    //   console.log('VAS');
    //   $('img[data-toggle="popover"]').popover('hide');
    // }
  })
});