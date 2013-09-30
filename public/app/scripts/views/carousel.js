BooksManager.CarouselView = Ember.View.extend({
  templateName: 'carousel',
  layoutName: 'carousel-layout',
  classNames: ['carousel'],
  init: function () {
    this._super.apply(this, arguments);
    var obj = this.get('content.firstObject');
    // Ember.set(obj, 'isActive', true);
  },
  actions: {

  },
  didInsertElement: function () {
    this.$('.jcarousel-skin-tango').jcarousel();
  },
  itemsView: Ember.CollectionView.extend({
    tagName: 'ul',
    classNames: ['jcarousel-list'],

    contentBinding: 'parentView.content',
    itemViewClass: Ember.View.extend({
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
        this.$('img[data-toggle="popover"]').popover({
          placement: 'auto top',
          trigger: 'manual',
          title: 'hola',
          content: 'hola',
          container : '.forpopover'
        });
      }
    })
  })
});