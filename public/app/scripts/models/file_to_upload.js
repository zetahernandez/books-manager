BooksManager.FileToUpload = Ember.Object.extend({
  index: null,
  file: null,
  identified: false,
  uploaded: 0,
  uuid: null,
  status: "",
  identificateError: undefined,
  error: "",
  volume: null,
  /*
      return file.name value 
  */
  name: function () {
    return this.get('file.name');
  }.property('file.name'),

  isUploadComplete: function () {
    return this.get('uploaded') === 100;
  }.property('uploaded'),

  isISBNNotFoundError: function () {
    return this.get('identificateError').errorTpye === 'ISBNNotFoundError';
  }.property('identificateError'),

  isVolumeNotFound: function () {
    return this.get('identificateError').errorTpye === 'ISBNNotFoundError';
  }.property('identificateError'),

  isIrrecuperableError: function () {
    return this.get('identificateError').errorTpye === 'ISBNNotFoundError';
  }.property('identificateError'),

  /*
    Convert and return  file.size bytes size value on meagabytes
  */
  size: function () {
    var result,
      bytes = this.get('file.size'),
      precision = 2,
      kilobyte = 1024,
      megabyte = kilobyte * 1024,
      gigabyte = megabyte * 1024,
      terabyte = gigabyte * 1024;

    if ((bytes >= 0) && (bytes < kilobyte)) {
      result = bytes + ' B';

    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
      result = (bytes / kilobyte).toFixed(precision) + ' KB';

    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
      result = (bytes / megabyte).toFixed(precision) + ' MB';

    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
      result = (bytes / gigabyte).toFixed(precision) + ' GB';

    } else if (bytes >= terabyte) {
      result = (bytes / terabyte).toFixed(precision) + ' TB';

    } else {
      result = bytes + ' B';
    }
    return result;
  }.property('file.size')

});