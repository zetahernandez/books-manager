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
        file.set('uuid', data);
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
  identificate: function(uuids) {
    
    var socket = io.connect(window.location.origin);
    
    socket.on('news', function(data) {
      console.log(data);
      
    });
    socket.emit('identificate', {"uuids": uuids } ,function(data) {
      console.log(data);
    });
  },

  actions: {
    /*
      Upload File to Server
  */
    uploadToServer: function() {
      var deferreds = [],
        _self = this;
      //create array of all ajax queries to upload     
      jQuery.each(this.get('files'), function(index, file) {
        deferreds.push(_self.uploadFile(file));
      });
      //wait for all functions ends
      jQuery.when.apply(jQuery, deferreds).then(function(a, b, c) {
        console.log('uploaded');
        console.log(arguments);
        var uuids = [];

        jQuery.each(arguments, function(index, argument) {
          uuids.push(argument[0]);
        });

        _self.identificate(uuids);
      });
    },

    clearListFile: function() {
      this.set('files', []);
    }
  }
});