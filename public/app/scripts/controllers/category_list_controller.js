BooksManager.CategoryListController = Ember.ArrayController.extend({
  needs: ['volumeList'],
  selectedCategory: null,

  selectedCategories: Ember.ArrayProxy.create({}),

  selectCategories: function (category) {
    var categories = [];
    if (category !== null && category !== undefined && category.get('parent')) {
      categories = categories.concat(this.selectCategories(category.get('parent')));
    }
    categories.push(category);
    return categories;
  },

  viewAllCategories: function () {
    this.get('selectedCategories').clear();
    this.set('selectedCategory', null);
    /*  var parents = BooksManager.Category.find().filter(function (category) {
              return category.get('parent') === null;
          });*/
    var parents = BooksManager.Category.find();
    this.set('content', parents);
    this.get('controllers.volumeList').showAll();
  },

  selectCategory: function (category) {
    this.set('selectedCategory', category);
    this.get('selectedCategories').set('content', this.selectCategories(this.get('selectedCategory')));
    this.set('content', this.get('selectedCategory').get('subCategories'));
    this.get('controllers.volumeList').filterByCategory(this.get('selectedCategory'));
  }

});