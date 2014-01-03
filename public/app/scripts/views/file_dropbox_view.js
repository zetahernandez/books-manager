BooksManager.FileDropBoxView = Ember.View.extend(BooksManager.DragDropMixin, {
  tagName: "div",
  classNames: ["dropbox"],
  template: Ember.Handlebars.compile('<span id="droplabel">{{dropText}}</span>'),

  handleDrop: function(event) {
    var files = event.dataTransfer.files;
    this.controller.processFiles(files);
  }
});