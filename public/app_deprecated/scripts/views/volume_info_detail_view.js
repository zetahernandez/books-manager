BooksManager.VolumeInfoDetailView = Ember.View.extend({
  template: 'volumeInfoDetailTemplate',
  didInsertElement: function () {
    Ember.$('.scrollable-content').animate({
      scrollTop: 0
    }, 2000);
  }
});