BooksManager.VolumeInfoDetailController = Ember.ObjectController.extend({
  needs: ['volumeList'],

  openPdf: function (volumeInfo) {
    var volumeInfoId = volumeInfo.get('id');
    window.open("rest/volumesInfo/open/" + volumeInfoId);
  },
  cancel: function () {
    this.transitionToRoute('volumes');
  }
});