BooksManager.SearchVolumeView = Ember.TextField.extend(Ember.TargetActionSupport, {
  valueBinding: 'controller.searchText',
  classNames: ["form-control"],
  insertNewline: function () {
    this.get("controller").searchVolumes();
  }
});