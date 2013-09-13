var api = require('./'),
  models = require('../models').db();

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
  app.get('/api/volumes/:id', function (req, res) {
    var volumeId = req.param("id");
    models.Volume.findById(volumeId, function (err, volume) {
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

  app.get('/api/volumes', function (req, res) {
    models.Volume.findAll(function (err, volumes) {
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
  app.post('/api/volumes', function (req, res) {
    models.Volume.addVolume(req.body, function (err, volume) {
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
  app.put('/api/volumes/:id', function (req, res) {
    var volumeId = req.param("id");
    models.Volume.updateVolume(volumeId, req.body, function (err, volume) {
      res.send(volume);
    });
  });

  /**
   * Maping the endpoint for delete volume
   *
   * @param  {Request} req
   * @param  {Response} res
   * @return {void}
   */
  app.delete('/api/volumes/:id', function (req, res) {
    models.Volume.removeVolume(req.body, function (err, volume) {
      res.send(volume);
    });
  });
  return app;
}
module.exports.mapRoutes = mapRoutes;