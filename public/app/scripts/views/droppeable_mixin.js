BooksManager.DroppableMixin = Ember.Mixin.create({
  
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
  }
  
});