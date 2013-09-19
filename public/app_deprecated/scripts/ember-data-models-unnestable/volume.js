BooksManager.Volume = DS.Model.extend({
  kind: DS.attr('string'),
  etag: DS.attr('string'),
  selfLink: DS.attr('string'),
  volumeInfo: DS.belongsTo('volume-info')
});

BooksManager.VolumeSerializer = DS.RESTSerializer.extend({
  extractArray: function (store, type, payload, id, requestType) {
    console.log('extractArray');
    var volumes = payload.volumes;

    volumes.forEach(function (volume) {
      console.log(volume);
    });

    return this._super(store, type, payload, id, requestType);
  },
  extractSingle: function (store, type, payload, id, requestType) {
    console.log('extractSingle');
    return this._super(store, type, payload, id, requestType);
  }
});