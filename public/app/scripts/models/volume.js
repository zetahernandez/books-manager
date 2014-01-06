/**
 * [Volume description]
 * @type {[type]}
 */
BooksManager.Volume = Ember.Object.extend({
  kind: null,
  etag: null,
  selfLink: null,
  volumeInfo: null,

  /**
   * [unescapedDescription description]
   * @return {[type]} [description]
   */
  unescapedDescription: function () {
    return this.get('volumeInfo.description').htmlSafe();
  }.property('volumeInfo.description'),

  /**
   * [formattedPublishedDate description]
   * @return {[type]} [description]
   */
  formattedPublishedDate: function () {
    if (this.get('volumeInfo.publishedDate')) {
      var publishedDate = new Date(this.get('volumeInfo.publishedDate'));
      return publishedDate.getUTCDay() + "/" + (publishedDate.getUTCMonth() + 1) + "/" + publishedDate.getUTCFullYear();
    }
    return '';
  }.property('volumeInfo.publishedDate').cacheable()

});

BooksManager.Volume.reopenClass({
  /**
   * [findAll description]
   * @return {[type]} [description]
   */
  findAll: function () {
    return Ember.$.getJSON('/api/volumes/').then(function (json, textStatus) {
      var volumes = Ember.ArrayProxy.create({
        content: []
      });
      json.volumes.forEach(function (volume) {
        volumes.pushObject(BooksManager.Volume.create(volume));
      });
      return volumes;
    });

  }
});