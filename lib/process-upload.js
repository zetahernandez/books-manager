var google = require('googleapis'),
  books = google.books('v1'),
  async = require('async'),
  conf = require('./conf'),
  pdfLoader = require('./pdfloader'),
  models = require('./models');
/**
 * [findISBN description]
 * @param  {[type]}   identifier [description]
 * @param  {Function} callback   [description]
 * @return {[type]}              [description]
 */
module.exports.process = function(identifier, cb) {
  var upload,
    isbn,
    volume
  self = this;

  /**
   * [findISBN description]
   * @param  {[type]} text [description]
   * @return {[type]}      [description]
   */
  function findISBN(text) {
    var reg = /ISBN(-1(?:(0)|3))?:?\x20(\s)*[0-9]+[- ][0-9]+[- ][0-9]+[- ][0-9]*[- ]*[xX0-9]/g,
      isbn,
      matches = reg.exec(text);

    if (matches) {
      isbn = matches[0].replace(/ISBN/g, '').replace(/:/g, '').replace(' ', '').replace(/-/g, '').trim();
    }
    return isbn;
  }

  async.series({

      findUpload: function(callback) {
        models.Upload.find({
          identifier: identifier
        }, function(err, upload) {
          if (err) return callback(err);
          if (!upload) return callback(new Error('Upload not found for identifier: ' + identifier));

          self.upload = upload;
          callback(null);
        });

      },

      loadPDFAndFindISBN: function(callback) {
        pdfLoader.loadPDF(self.upload, function(err, data) {
          if (err) return callback(err);
          if (!data) return callback(new Error('No text on pdf'));
          self.isbn = findISBN(data);
          if (!self.isbn) return callback(new Error('ISBN not found'));
          callback(null);
        });

      },

      findISBNOnGoogle: function(callback) {
        books.volumes.list({
          auth: conf.commons.google.serverKey,
          q: 'isbn:' + self.isbn
        }, function(err, volume) {
          if (err) return callback(err);
          if (!volume || volume.totalItems < 1) return callback(new Error('ISBN not results from google books api'));
          self.volume = volume.items[0];
          callback(null);
        });
      },

      findVolumeOnGoogle: function(callback) {
        books.volumes.get({
          auth: conf.commons.google.serverKey,
          volumeId: self.volume.id
        }, function(err, volume) {
          if (err) return callback(err);
          if (!volume) return callback(new Error('Volume not found on google books api'));
          self.volume = volume;
          callback(null);
        });
      },

      saveVolume: function(callback) {
        models.Volume.addVolume(self.volume, function(err, volumeResult) {
          if (err) return callback(err);
          callback(null, volumeResult);
        });
      }
    },
    // optional callback
    cb);
}