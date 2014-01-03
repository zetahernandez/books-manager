BooksManager.UploadIndexController = Ember.ObjectController.extend({
  dropText: 'Drop Here',
  files: [],
  ignoredFiles: [],


  processFiles: function(files) {
    var _self = this;
    jQuery.each(files, function(index, file) {
      if (file.type === "application/pdf") {
        _self.get('files').pushObject(BooksManager.FileToUpload.create({
          index: index,
          file: file
        }));
      } else {
        _self.get('ignoredFiles').pushObject(BooksManager.FileToUpload.create({
          index: index,
          file: file
        }));
      }
    });
  },

  uploadFile: function(file) {
    var formData = new FormData();
    console.log(file);
    formData.append(file.get('file').name, file.get('file'));

    return jQuery.ajax({
      url: '/api/volumes/upload',
      type: 'POST',
      data: formData,
      blocker: true,
      success: function(data, textStatus, xhr) {
        file.set('uploaded', 100);
     //   file.set('uuid', data);
        file.set('status', textStatus);
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(errorThrown);
       // file.set('status', textStatus);
      },
      xhr: function() { // custom xhr
        var myXhr = jQuery.ajaxSettings.xhr();
        if (myXhr.upload) { // if upload property exists
          myXhr.upload.addEventListener('progress', function(progress) {
            if (progress.lengthComputable) {
              //update progress 
              file.set('uploaded', Math.round((progress.loaded / progress.total) * 100));
            }
          }, false); // progressbar
        }
        return myXhr;
      },
      cache: false,
      contentType: false,
      processData: false
    });


  },

  actions: {
    /*
      Upload File to Server
  */
    uploadToServer: function() {
      var _self = this;
      jQuery.each(this.get('files'), function(index, file) {
        jQuery.when(_self.uploadFile(file)).then(function() {
          console.log('uploaded');
        }, function() {
          console.log('fail');
        });
      });
    },

    clearListFile: function() {
      this.set('files', []);
    }
  }
});