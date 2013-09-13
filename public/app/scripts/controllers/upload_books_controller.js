BooksManager.UploadBooksController = Ember.ObjectController.extend({
  dropText: 'Drop Here',
  files: [],
  ignoredFiles: [],

  processFiles: function (files) {
    var _self = this;
    jQuery.each(files, function (index, file) {
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

  clearListFile: function () {
    this.set('files', []);
  },

  /*
      Upload File to Server
      */
  uploadToServer: function () {

    var deferreds = [],
      _self = this;
    //create array of all ajax queries to upload     
    jQuery.each(this.get('files'), function (index, file) {
      deferreds.push(_self.deferredTofile(file));
    });
    //wait for all functions ends
    jQuery.when.apply(jQuery, deferreds).then(function () {
      var uuidsToIdentificate = [];
      jQuery.each(arguments, function (index, argument) {
        uuidsToIdentificate.push(argument[0]);
      });
      jQuery.ajax({
        type: "GET",
        url: "/rest/volumes/identificateFiles",
        data: "uuids=" + JSON.stringify(uuidsToIdentificate),
        success: function (results) {
          jQuery.each(_self.get('files'), function (index, file) {
            var result = results[file.get('uuid')];
            if (result.error) {
              file.set('identificateError', true);
              file.set('error', result.error);
            } else {
              file.set('identificateError', false);
              file.set('volume', BooksManager.Volume.createRecord(result.result));
            }
          });
        }
      });

    }, function () {
      console.log('fail');
    });

  },

  deferredTofile: function (file) {
    var formData = new FormData();

    formData.append('file', file.get('file'));

    var uploadFunction = jQuery.ajax({
      url: '/rest/volumes/upload',
      type: 'POST',
      data: formData,
      blocker: true,
      success: function (data, textStatus, xhr) {
        file.set('uploaded', 100);
        file.set('uuid', data);
        file.set('status', textStatus);
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log(errorThrown);
        file.set('status', textStatus);
      },
      xhr: function () { // custom xhr
        var myXhr = jQuery.ajaxSettings.xhr();
        if (myXhr.upload) { // if upload property exists
          myXhr.upload.addEventListener('progress', function (progress) {
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

    return uploadFunction;
  }
  /*
    Call to server to find ISBN, and volume
    */
  //     loadVolume: function (file) {
  //       var request = new jQuery.atmosphere.AtmosphereRequest(),
  //         socket = jQuery.atmosphere,
  //         subSocket;

  //       request.url = "rest/supervise/chat";
  //       request.contentType = "application/json";
  //       subSocket = socket.subscribe(request);
  //       subSocket.push(JSON.stringify({
  //         "uuid": file.get('uuid')
  //       }));

  //       request.onOpen = function (response) {
  //         console.log(response);
  //       };

  //       request.onReconnect = function (request, response) {
  //         console.log("Reconnecting");
  //         socket.info("Reconnecting");
  //       };

  //       request.onMessage = function (response) {
  //         var message = response.responseBody;
  //         console.log(message);
  //         try {
  //           var json = JSON.parse(message);
  //         } catch (e) {
  //           console.log('Error: ', message.data);
  //           return;
  //         }

  //         console.log('else');
  //         // var me = json.author == author;
  //         // var date = typeof (json.time) == 'string' ? parseInt(json.time) : json.time;
  //         // addMessage(json.author, json.text, me ?
  //         //   'blue' : 'black', new Date());

  //       };

  //       request.onError = function (response) {
  //         console.log(response);
  //       };

  //       //TODO:
  //       /*jQuery.ajax({
  //         url: '/rest/volumes/loadVolume',
  //         type: 'GET',
  //         dataType: 'json',
  //         data: {
  //           uuid: file.get('uuid')
  //         },
  //         complete: function (xhr, textStatus) {
  //           //called when complete
  //         },
  //         success: function (data, textStatus, xhr) {
  //           //called when successful
  //         },
  //         error: function (xhr, textStatus, errorThrown) {
  //           //called when there is an error
  //         }
  //       });
  // }*/
  //     }
});