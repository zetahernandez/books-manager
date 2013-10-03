BooksManager.VolumeCarouselItem = Ember.View.extend({
  tagName: 'li',
  classNames: ['jcarousel-item'],
  // classNameBindings: ['content.isActive:active'],
  templateName: 'carousel-item',
  volumePopover: null,

  didInsertElement: function () {
    //Add tooltip to tile
    this.$('a[data-toggle="tooltip"]').tooltip({
      placement: 'auto bottom'
    });
    var _self = this;
    this.$('img[data-toggle="popover"]').clickover({
      html: true,
      placement: 'left auto',
      title: '<strong>' + _self.content.volumeInfo.title + '</strong>',
      global_close: true,
      content: function () {

        var popoverView = BooksManager.VolumePopoverView.create({
          content: _self.content
        }),
          instance = _self.createChildView(popoverView);
        //hack to return the html for view
        return instance.renderToBuffer().string();
      },
      container: '.popover-container'
    });
  },

  eventManager: Ember.Object.create({
    mouseEnter: function (event, view) {

    }
  })
});