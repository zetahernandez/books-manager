BooksManager.VolumeCarouselItem = Ember.View.extend({
  tagName: 'li',
  classNames: ['jcarousel-item'],
  // classNameBindings: ['content.isActive:active'],
  templateName: 'carousel_item',
  volumePopover: null,

  didInsertElement: function () {
    //Add tooltip to tile
    this.$('a[data-toggle="tooltip"]').tooltip({
      placement: 'auto bottom'
    });
    var _self = this;
    this.$('div[data-toggle="popover"]').clickover({
      html: true,
      placement: 'left auto',
      title: '<strong>' + _self.content.volumeInfo.title + '</strong>',
      global_close: true,
      content: function () {
        _self.removeAllChildren();
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
  willDestroyElement: function () {
    this.removeAllChildren();
    this.destroy();
  },

  eventManager: Ember.Object.create({
    mouseEnter: function (event, view) {
      view.$('div[data-toggle="popover"]').css('display', 'block');
    },
    mouseLeave: function (event, view) {
      view.$('div[data-toggle="popover"]').css('display', 'none');
    }
  })
});