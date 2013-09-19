BooksManager.Category = DS.Model.extend({
  level: DS.attr('number'),
  categoryName: DS.attr('string'), //{ key: 'thumbnailUrl' }
  parent: DS.belongsTo('category'),
  subCategories: DS.hasMany('category'),

  haveParent: function () {
    return this.get('parent') !== null && this.get('parent') !== undefined;
  }.property('parent'),

  leftMarginStyle: function () {
    return "margin-left:" + parseInt(this.get('level'), 10) * 10 + "px";
  }.property('level')
});