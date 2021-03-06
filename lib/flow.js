var
  fs = require('fs'),
  path = require('path'),
  util = require('util'),
  Stream = require('stream').Stream;

module.exports = function(temporaryFolder) {
  var $ = this;
  $.temporaryFolder = temporaryFolder || process.env.TMPDIR;
  $.maxFileSize = null;
  $.fileParameterName = 'file';

  try {
    fs.mkdirSync($.temporaryFolder);
  } catch (e) {}

  function cleanIdentifier(identifier) {
    return identifier.replace(/[^0-9A-Za-z_-]/g, '');
  }

  function getChunkFilename(chunkNumber, identifier) {
    // Clean up the identifier
    identifier = cleanIdentifier(identifier);
    // What would the file name be?
    return path.resolve($.temporaryFolder, './flow-' + identifier + '.' + chunkNumber);
  }

  function validateRequest(chunkNumber, chunkSize, totalSize, identifier, filename, fileSize) {
    // Clean up the identifier
    identifier = cleanIdentifier(identifier);

    // Check if the request is sane
    if (chunkNumber === 0 || chunkSize === 0 || totalSize === 0 || identifier.length === 0 || filename.length === 0) {
      return 'non_flow_request';
    }
    var numberOfChunks = Math.max(Math.floor(totalSize / (chunkSize * 1.0)), 1);
    if (chunkNumber > numberOfChunks) {
      return 'invalid_flow_request1';
    }

    // Is the file too big?
    if ($.maxFileSize && totalSize > $.maxFileSize) {
      return 'invalid_flow_request2';
    }

    if (typeof(fileSize) !== 'undefined') {
      if (chunkNumber < numberOfChunks && fileSize !== chunkSize) {
        // The chunk in the POST request isn't the correct size
        return 'invalid_flow_request3';
      }
      if (numberOfChunks > 1 && chunkNumber === numberOfChunks && fileSize !== ((totalSize % chunkSize) + parseInt(chunkSize))) {
        // The chunks in the POST is the last one, and the fil is not the correct size
        return 'invalid_flow_request4';
      }
      if (numberOfChunks === 1 && fileSize !== totalSize) {
        // The file is only a single chunk, and the data size does not fit
        return 'invalid_flow_request5';
      }
    }

    return 'valid';
  }

  //'found', filename, original_filename, identifier
  //'not_found', null, null, null
  $.get = function(req, callback) {
    var
      chunkNumber = parseInt(req.param('flowChunkNumber', 0)),
      chunkSize = parseInt(req.param('flowChunkSize', 0)),
      totalSize = parseInt(req.param('flowTotalSize', 0)),
      identifier = req.param('flowIdentifier', ""),
      filename = req.param('flowFilename', "");

    if (validateRequest(chunkNumber, chunkSize, totalSize, identifier, filename) === 'valid') {
      var chunkFilename = getChunkFilename(chunkNumber, identifier);
      fs.exists(chunkFilename, function(exists) {
        if (exists) {
          callback('found', chunkFilename, filename, identifier);
        } else {
          callback('not_found', null, null, null);
        }
      });
    } else {
      callback('not_found', null, null, null);
    }
  };

  //'partly_done', filename, original_filename, identifier
  //'done', filename, original_filename, identifier
  //'invalid_flow_request', null, null, null
  //'non_flow_request', null, null, null
  $.post = function(req, callback) {

    var
      fields = req.body,
      files = req.files,

      chunkNumber = parseInt(fields['flowChunkNumber']),
      chunkSize = parseInt(fields['flowChunkSize']),
      totalSize = parseInt(fields['flowTotalSize']),
      filename = fields['flowFilename'],
      identifier = cleanIdentifier(fields['flowIdentifier']);

    if (!files[$.fileParameterName] || !files[$.fileParameterName].size) {
      callback('invalid_flow_request', null, null, null);
      return;
    }

    var
      original_filename = files[$.fileParameterName]['name'],
      path = files[$.fileParameterName]['path'],
      type = files[$.fileParameterName]['type'];


    var validation = validateRequest(chunkNumber, chunkSize, totalSize, identifier, filename, files[$.fileParameterName].size);
    if (validation === 'valid') {
      var chunkFilename = getChunkFilename(chunkNumber, identifier);

      // Save the chunk (TODO: OVERWRITE)
      fs.rename(files[$.fileParameterName].path, chunkFilename, function() {

        // Do we have all the chunks?
        var currentTestChunk = 1;
        var numberOfChunks = Math.max(Math.floor(totalSize / (chunkSize * 1.0)), 1);
        var testChunkExists = function() {
          fs.exists(getChunkFilename(currentTestChunk, identifier), function(exists) {
            if (exists) {
              currentTestChunk++;
              if (currentTestChunk > numberOfChunks) {
                var ws = fs.createWriteStream(path);
                //collect all chunks
                $.write(identifier, ws, function() {
                  callback('done', filename, original_filename, identifier, type, path, totalSize);
                  //
                  // $.clean(identifier);
                });
              } else {
                // Recursion
                testChunkExists();
              }
            } else {
              callback('partly_done', filename, original_filename, identifier, type, chunkFilename, totalSize);
            }
          });
        };
        testChunkExists();
      });
    } else {
      callback(validation, filename, original_filename, identifier);
    }
  };

  // Pipe chunks directly in to an existsing WritableStream
  //   r.write(identifier, response);
  //   r.write(identifier, response, {end:false});
  //
  //   var stream = fs.createWriteStream(filename);
  //   r.write(identifier, stream);
  //   stream.on('data', function(data){...});
  //   stream.on('finish', function(){...});
  $.write = function(identifier, writableStream, callback, options) {
    options = options || {};
    options.end = (typeof options['end'] === 'undefined' ? true : options['end']);

    // Iterate over each chunk
    var pipeChunk = function(number) {

      var chunkFilename = getChunkFilename(number, identifier);
      fs.exists(chunkFilename, function(exists) {

        if (exists) {
          // If the chunk with the current number exists,
          // then create a ReadStream from the file
          // and pipe it to the specified writableStream.
          var sourceStream = fs.createReadStream(chunkFilename);
          sourceStream.pipe(writableStream, {
            end: false
          });
          sourceStream.on('end', function() {
            // When the chunk is fully streamed,
            // jump to the next one
            pipeChunk(number + 1);
          });
        } else {
          // When all the chunks have been piped, end the stream
          if (options.end) {
            writableStream.end();
          }
          if (options.onDone) {
            options.onDone();
          }
          callback();
        }
      });
    };
    pipeChunk(1);
  };

  $.clean = function(identifier, options) {
    options = options || {};

    // Iterate over each chunk
    var pipeChunkRm = function(number) {

      var chunkFilename = getChunkFilename(number, identifier);

      //console.log('removing pipeChunkRm ', number, 'chunkFilename', chunkFilename);
      fs.exists(chunkFilename, function(exists) {
        if (exists) {
          fs.unlink(chunkFilename, function(err) {
            if (options.onError) {
              options.onError(err);
            }
          });

          pipeChunkRm(number + 1);

        } else {

          if (options.onDone) {
            options.onDone();
          }

        }
      });
    };
    pipeChunkRm(1);
  };

  return $;
};