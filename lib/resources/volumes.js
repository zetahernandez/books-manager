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
  util = require('util'),
  conf = require('../conf.js'),
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
    models.Volume.save(req.body, function(err, volume) {
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
    flow.post(req, function(status, filename, original_filename, identifier, type, file_path, totalSize) {
      console.log('POST /api/upload', status, original_filename, identifier, type, file_path, totalSize);
      if (status === 'done') {

        var newPath = path.resolve(conf.commons.booksPath, 'temp', identifier);
        fs.rename(file_path, newPath, function() {
          new models.Upload({
            user: req.user,
            path: newPath,
            identifier: identifier,
            fname: original_filename,
            fsize: totalSize,
            ftype: type
          }).save(function(err, result) {
            if (err) return res.send(500);
            console.log('moved to new Path:' + newPath);
            console.log('saved:' + result);
            res.json(200, _.omit(result, ['path', 'user']));
            flow.clean(identifier);   
          });
        });
      } else {
        res.json(200, {
          file_part: true
        });
      }
    });
  });

  /**
   * Process an uploaded file to
   *
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  app.get('/api/uploaded/:identifier', authenticated, function(req, res) {
    var identifier = req.param('identifier');
    console.log('GET /api/upload/' + identifier);
    //process the uploaded file to find the isbn and search on google books
    process_upload.process(identifier, req.user, function(err, volume) {
      if (err) {
        err.success = false;
        return res.json(200, util.isError(err) ? err.error : err);
      }
      volume.success = true;
      res.json(200, _.omit(volume, ['upload', 'user']));
    });
  });

  return app;
}
module.exports.mapRoutes = mapRoutes;