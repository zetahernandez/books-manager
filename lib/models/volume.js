module.exports = function() {
  var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

  /**
   * [imageSchema description]
   * @type {Schema}
   */
  var IndustryIdentifier = new Schema({
    type: String,
    identifier: String
  });

  /**
   * [VolumeSchema description]
   * @type {Schema}
   */
  var VolumeSchema = new Schema({
    kind: String,
    _id: ObjectId,
    id: String,
    etag: String,
    selfLink: String,
    user: {
      type: ObjectId,
      ref: 'User'
    },
    path: String,
    volumeInfo: {
      _id: ObjectId,
      title: String,
      authors: [String],
      publisher: String,
      publishedDate: Date,
      description: String,
      industryIdentifiers: [IndustryIdentifier],
      pageCount: Number,
      dimensions: {
        height: String
      },
      printType: String,
      categories: [String],
      averageRating: Number,
      ratingsCount: Number,
      contentVersion: String,
      imageLinks: {
        smallThumbnail: String,
        thumbnail: String
      },
      language: String,
      previewLink: String,
      infoLink: String,
      canonicalVolumeLink: String
    },
    saleInfo: {
      country: String,
      saleability: String,
      isEbook: Boolean
    },
    accessInfo: {
      country: String,
      viewability: String,
      embeddable: Boolean,
      publicDomain: Boolean,
      textToSpeechPermission: String,
      epub: {
        isAvailable: Boolean
      },
      pdf: {
        isAvailable: Boolean
      },
      webReaderLink: String,
      accessViewStatus: String
    },
    searchInfo: {
      textSnippet: String
    }
  });

  var Volume = mongoose.model('Volume', VolumeSchema);

  /**
   * Add a new volume Save it in mongodb
   *
   * @param Volume     volume
   * @param {Function} callback (err,result)
   */
  var addVolume = function(volume, callback) {
    volume = new Volume(volume);
    volume.save(callback);
  };

  /**
   * List all volumes
   *
   * @param  {Function} callback (err,results)
   * @return {void}
   */
  var findAll = function(callback) {
    Volume.find(callback);
  };

  /**
   * Find a volume with id passed in the parameter
   *
   * @param  {String}   _id
   * @param  {Function} callback (err, volume)
   * @return {void}
   */
  var findById = function(_id, callback) {
    Volume.findOne({
      id: _id
    }, callback);
  };

  return {
    addVolume: addVolume,
    findAll: findAll,
    findById: findById,
    Volume: Volume
  };
};