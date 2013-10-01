BooksManager.VolumeCarouselItem = Ember.View.extend({
  tagName: 'li',
  classNames: ['jcarousel-item'],
  // classNameBindings: ['content.isActive:active'],
  templateName: 'carousel-item',
  didInsertElement: function () {
    //Add tooltip to tile
    this.$('a[data-toggle="tooltip"]').tooltip({
      placement: 'auto bottom'
    });
    //Add popover in image component
    var _self = this;
    this.$('img[data-toggle="popover"]').popover({
      html: true,
      placement: 'auto top',
      trigger: 'hover',
      title: 'hola',
      content: function () {
        BooksManager.viewPopover = Ember.View.create({
          templateName: 'book-popover',
          content: _self.content
        });
        return Ember.Handlebars.compile("{{view BooksManager.viewPopover}}");
      },
      container: '.forpopover'
    });
  }
});