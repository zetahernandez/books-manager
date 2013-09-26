BooksManager.CarouselView = Ember.View.extend({
  templateName: 'carousel',
  classNames: ['jcarousel-skin-tango','width'],
  init: function () {
    this._super.apply(this, arguments);
    var obj = this.get('content.firstObject');
    // Ember.set(obj, 'isActive', true);
  },
  actions: {
    
  },
  didInsertElement: function () {
    this.$().jcarousel();
  },
  itemsView: Ember.CollectionView.extend({
    tagName: 'ul',
    classNames: ['jcarousel-list'],
    contentBinding: 'parentView.content',
    itemViewClass: Ember.View.extend({
      tagName: 'li',
      classNames: ['jcarousel-item'],
      // classNameBindings: ['content.isActive:active'],
      templateName: 'carousel-item'
    })
  })
});