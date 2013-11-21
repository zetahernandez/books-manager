BooksManager.CarouselView = Ember.View.extend({
  templateName: 'carousel',
  layoutName: 'carousel_layout',
  classNames: ['carousel'],
  carouselItemViewClass: null,
  init: function() {
    this._super.apply(this, arguments);
    var obj = this.get('content.firstObject');
    // Ember.set(obj, 'isActive', true);
  },
  actions: {

  },
  didInsertElement: function() {
    this.$('.jcarousel-skin-tango').jcarousel();
  },
  itemsView: Ember.CollectionView.extend({
    tagName: 'ul',
    classNames: ['jcarousel-list'],
    contentBinding: 'parentView.content',
    itemViewClassBinding: 'parentView.carouselItemViewClass'
  })
});