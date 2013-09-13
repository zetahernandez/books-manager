BooksManager.FileDropBox = Ember.View.extend({
  tagName: "div",
  classNames: ["dropbox"],
  template: Ember.Handlebars.compile('<span id="droplabel">{{dropText}}</span>'),

  
  dragEnter: function (event) {
    event.stopPropagation();
    event.preventDefault();
    this.$().addClass('dropfocus');
  },

  dragExit: function (event) {
    event.stopPropagation();
    event.preventDefault();

  },

  dragOver: function (event) {
    event.stopPropagation();
    event.preventDefault();

  },
  dragLeave: function () {
    this.$().removeClass('dropfocus');
  },
  drop: function (event) {
    event.stopPropagation();
    event.preventDefault();
    this.$().removeClass('dropfocus');
    this.handleDrop(event);
  },
  handleDrop: function (event) {
    var files = event.dataTransfer.files;
    this.controller.processFiles(files);
    /* document.getElementById("droplabel").innerHTML = "Processing " + file.name;

    var reader = new FileReader();

    // init the reader event handlers
    reader.onprogress = handleReaderProgress;
    reader.onloadend = handleReaderLoadEnd;

    // begin the read operation
    reader.readAsDataURL(file);*/
  }
});