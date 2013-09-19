BooksManager.VolumeInfo = DS.Model.extend({
 
  description: DS.attr(),
 
  unescapedDescription: function () {
    return this.get('description').htmlSafe();
  }.property('description'),

  formattedPublishedDate: function () {
    if (this.get('publishedDate')) {
      return this.get('publishedDate').getUTCDay() + "/" + (this.get('publishedDate').getUTCMonth() + 1) + "/" + this.get('publishedDate').getUTCFullYear();
    }

    return '';
  }.property('publishedDate').cacheable()

});
BooksManager.VolumeINFOSerializer = DS.RESTSerializer.extend({
  extractArray: function (store, type, payload, id, requestType) {
    console.log('extractArray');
    var volumeInfo = payload.volumeInfo;

    volumeInfo.forEach(function (volume) {
      console.log(volume);
    });

    return this._super(store, type, payload, id, requestType);
  },
  extractSingle: function (store, type, payload, id, requestType) {
    console.log('extractSingle');
    return this._super(store, type, payload, id, requestType);
  }
});