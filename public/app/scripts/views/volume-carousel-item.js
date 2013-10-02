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
    //Add popover in image component
    var _self = this;
    this.volumePopover = this.$('img[data-toggle="popover"]').popover({
      html: true,
      placement: 'auto top',
      trigger: 'manual',
      title: 'hola',
      content: function () {

        var popoverView = BooksManager.VolumePopoverView.create({
          content: _self.content
        }),
          instance = _self.createChildView(popoverView);
        //hack to return the html for view
        return instance.renderToBuffer().string();
      },
      container: '.forpopover'
    });
  },

  eventManager: Ember.Object.create({
    mouseEnter: function (event, view) {
      view.volumePopover.popover('show');
    },
    mouseEnter: function (event, view) {
      view.volumePopover.popover('show');
    }
  })
});