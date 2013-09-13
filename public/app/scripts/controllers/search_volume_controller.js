BooksManager.SearchVolumeController = Ember.ObjectController.extend({
  needs: ['volumeList'],
  searchText: '',
  actions: {
    searchVolumes: function () {
      this.get('controllers.volumeList').searchVolumes(this.get('searchText'));
    }
  }

});