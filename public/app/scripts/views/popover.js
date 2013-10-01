BooksManager.Popover = Ember.View.extend({
  parentSelector: '',
  contentSelector: '',
  didInsertElement: function () {
    var self = this;
    $(self.parentSelector).popover({
      html: true,
      title: self.title,
      placement: 'right',
      content: function () {
        var $content = $(self.contentSelector);
        return $content.html();
      }
    });
  },
  close: function () {
    $(this.parentSelector).popover('hide');
  }
});