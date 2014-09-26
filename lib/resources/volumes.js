var api = require('./'),
  fs = require('fs'),
  path = require('path'),
  authenticated = require('./authenticated'),
  _ = require('underscore'),
  userUtil = require('../util/user'),
  multipart = require('connect-multiparty'),
  multipartMiddleware = multipart(),
  flow = require('../flow.js')(),
  process_upload = require('../process-upload'),
  models = require('../models');

function mapRoutes(app) {
  /**
   * Maping the endpoint for obtain a volume with specific id
   * in param id, this search on mongodb to obtain a volume and
   * respond to request with the volume searched
   *
   * @param  {Request} req
   * @param  {Response} res
   * @return {void}
   */
  app.get('/api/volumes/:id', function(req, res) {
    var volumeId = req.param("id");
    models.Volume.findById(volumeId, function(err, volume) {
      res.send(volume);
    });
  });

  /**
   * Maping the endpoint for obtain all volumes
   * this search on mongodb to obtain all volumes and
   * respond to request with the volumes searched
   *
   * @param  {Request} req
   * @param  {Response} res
   * @return {void}
   */

  app.get('/api/volumes', function(req, res) {
    console.log('GET /api/volumes');
    models.Volume.findAll(function(err, volumes) {
      res.send({
        volumes: volumes
      });
    });
  });

  /**
   * Maping the endpoint for save volume
   *
   * @param  {Request} req
   * @param  {Response} res
   * @return {void}
   */
  app.post('/api/volumes', function(req, res) {
    console.log('POST /api/volumes');
    models.Volume.addVolume(req.body, function(err, volume) {
      res.send(volume);
    });
  });

  /**
   * Maping the endpoint for update volume
   *
   * @param  {Request} req
   * @param  {Response} res
   * @return {void}
   */
  app.put('/api/volumes/:id', function(req, res) {
    var volumeId = req.param("id");
    models.Volume.updateVolume(volumeId, req.body, function(err, volume) {
      res.send(volume);
    });
  });

  /**
   * Maping the endpoint for upload book
   *
   * @param  {Request} req
   * @param  {Response} res
   * @return {void}
   */


  app.get('/api/upload', authenticated, function(req, res) {
    flow.get(req, function(status, filename, original_filename, identifier) {
      console.log('GET /api/upload', status);
      res.send(status == 'found' ? 200 : 404);
    });
    /*console.log('GET /api/volumes/upload');
       res.json(404, {
      error: "not found"
    });*/
  });

  app.post('/api/upload', authenticated, multipartMiddleware, function(req, res) {
    flow.post(req, function(status, filename, original_filename, identifier, type, path, totalSize) {
      console.log('POST /api/upload', status, original_filename, identifier, type, path, totalSize);
      if (status === 'done') {


        var userTmpPath = userUtil.tmpDir(req.user);

        var moveToTmpDirectory = function() {
          var newPath = userTmpPath + identifier;
          fs.rename(path, newPath, function() {
            models.Upload.add({
              user: req.user,
              path: newPath,
              identifier: identifier,
              fname: original_filename,
              fsize: totalSize,
              ftype: type
            }, function(err, result) {
              if (!err) {
                console.log('moved to new Path:' + newPath);
                console.log('saved:' + result);
                res.json(200, result);
              }
            });
          });
        };


        fs.exists(userTmpPath, function(exist) {

          if (!exist) {
            fs.mkdir(userTmpPath, function() {
              moveToTmpDirectory();
            });
          } else {
            moveToTmpDirectory();
          }
        });
      } else {
        res.json(200, {
          file_part: true
        });
      }

    });
    /* console.log('POST /api/volumes/upload');
    _.each(req.files, function(file, name, list) {

      
    });*/
  });

  app.get('/api/upload/:identifier', authenticated, function(req, res) {
    var identifier = req.param('identifier');
    console.log('GET /api/upload/' + identifier);
    
    process_upload.process(identifier, function(err, results) {
      if (err) return res.json(200, err);
      res.json(200, results);
    });
  });

  return app;
}
module.exports.mapRoutes = mapRoutes;