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
    id: { type: String, index: true },
    etag: String,
    selfLink: String,
    user: {
      type: ObjectId,
      ref: 'User'
    },
    upload: {
      path: String,
      fname: String,
      ftype: String,
      fsize: Number,
    },
    volumeInfo: {
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
        thumbnail: String,
        small: String,
        medium: String,
        large: String,
        extraLarge: String
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
    created: {
      type: Date,
      default: Date.now
    },
    searchInfo: {
      textSnippet: String
    }
  });

  return mongoose.model('Volume', VolumeSchema);
};