var google = require('googleapis'),
  books = google.books('v1'),
  async = require('async'),
  conf = require('./conf'),
  pdfUtil = require('pdf-to-text'),
  conf = require('./conf'),
  path = require('path'),
  fs = require('fs'),
  models = require('./models');
/**
 * [extractISBN description]
 * @param  {[type]}   identifier [description]
 * @param  {Function} callback   [description]
 * @return {[type]}              [description]
 */
module.exports.process = function(identifier, user, cb) {
  var upload,
    isbn,
    volume,
    destination;


  async.series([

      function findUpload(callback) {
        console.log('finding upload for identifier:' + identifier);
        models.Upload.findOneAndRemove({
          identifier: identifier
        }, function(err, result) {
          if (err) return callback(err);
          if (!result) return callback(new Error('INVALID_IDENTIFIER'));
          fs.exists(result.path, function(exist) {
            if (!exist) return callback(new Error('FILE_NOT_EXIST'));
            console.log('upload found');
            upload = result;
            callback(null, upload);
          })
        });
      },
      function loadPDFAndFindISBN(callback) {
        console.log('loading pdf for identifier: ' + identifier);
        pdfUtil.info(upload.path, function(err, info) {
          if (err) return callback(err);
          if (!info) return callback({
            error: 'PDF_NO_INFO'
          });
          if (info.pages) {
            var i = 0;
            //extract for each ten pages
            async.whilst(
              function() {
                return i < info.pages && !isbn;
              },
              function(callback) {
                option = {};
                option.from = i;
                option.to = i + 9 > info.pages - 1 ? info.pages - 1 : i + 9;
                i += 10;
                pdfUtil.pdfToText(upload.path, option, function(err, data) {
                  if (err) return callback(err);
                  isbn = extractISBN(data);
                  callback();
                });
              },
              function(err) {
                if (!isbn) return callback({
                  error: 'ISBN_NOT_FOUND'
                });
                console.log('isbn found for identifier: ' + identifier + ' isbn: ' + isbn);
                callback(err);
              }
            );
          } else {
            //extract all pdf
            pdfUtil.pdfToText(upload.path, function(err, data) {
              if (err) return callback(err);
              isbn = extractISBN(data);
              callback();
            });
          }
        });
      },
      function searchISBNOnGoogle(callback) {
        console.log('search volume info for identifier: ' + identifier + ' isbn: ' + isbn);
        books.volumes.list({
          auth: conf.commons.google.serverKey,
          q: 'isbn:' + isbn
        }, function(err, result) {
          if (err) return callback(err);
          if (!result || result.totalItems < 1) return callback({
            error: 'VOLUME_NOT_FOUND'
          });
          volume = result.items[0];
          console.log('volume info founded for identifier: ' + identifier + ' isbn: ' + isbn + ' id: ' + volume.id);
          callback(null);
        });
      },
      function checkExistBook(callback) {
        console.log('checking if exist volume on database for identifier: ' + identifier + ' id: ' + volume.id);
        models.Volume.count({
          id: volume.id
        }, function(err, count) {
          if (err) return callback(err);
          if (count > 0) return callback({
            error: 'VOLUME_ALREADY_EXISTS'
          });
          console.log('volume for identifier: ' + identifier + ' id: ' + volume.id + 'is new');
          callback(null);
        })
      },
      function searchVolumeOnGoogle(callback) {
        console.log('retrive volume info from google books for identifier: ' + identifier + ' id: ' + volume.id);
        books.volumes.get({
          auth: conf.commons.google.serverKey,
          volumeId: volume.id
        }, function(err, volume) {
          if (err) return callback(err);
          if (!volume) return callback({
            error: 'VOLUME_NOT_FOUND'
          });
          volume = volume;
          console.log('volume info for identifier: ' + identifier + ' id: ' + volume.id + ' was success');
          callback(null);
        });
      },
      function moveFileFromTempToDestionation(callback) {

        var temp_file_path = upload.path;
        destination = path.resolve(conf.commons.booksPath, volume.id);
        console.log('creating file for identifier: ' + identifier + ' id: ' + volume.id + ' on destination: ' + destination);
        fs.rename(temp_file_path, destination, function(err) {
          if (err) return callback(err);
          volume.user = user;
          volume.upload = {
            path: destination,
            fname: volume.id,
            fsize: upload.fsize,
            ftype: upload.ftype
          };
          callback(null);
        });
      },
      function saveVolume(callback) {
        console.log('saving volume for identifier: ' + identifier + ' id: ' + volume.id + ' on destination: ' + destination);
        volume.path = upload.path;
        var volumeResult = new models.Volume(volume);
        volumeResult.save(function(err) {
          if (err) return callback(err);
          callback(null, volumeResult);
        });
      }
    ],

    // callback
    function(err, results) {
      cb(err, results[6]);
    }
  );
}

/**
 * [findISBN description]
 * @param  {[type]} text [description]
 * @return {[type]}      [description]
 */
function extractISBN(text) {
  var reg = /ISBN(-1(?:(0)|3))?:?\x20(\s)*[0-9]+[- ][0-9]+[- ][0-9]+[- ][0-9]*[- ]*[xX0-9]/g,
    isbn,
    matches = reg.exec(text);

  if (matches) {

    if (matches[1]) {
      matches[0] = matches[0].replace(matches[1], '')
    }

    isbn = matches[0].replace(/ISBN/g, '').replace(/:/g, '').replace(/ /g, '').replace(/-/g, '').trim();
  }
  return isbn;
};