var Dropbox = require("dropbox"),
  config = require('../conf');

function mapRoutes(app) {
  /**
   * Maping the endpoint for obtain a categories
   *
   * @param  {Request} req
   * @param  {Response} res
   * @return {void}
   */
  app.get('/api/dropbox/test', function(req, res) {
    var client = new Dropbox.Client({
      key: config.commons.dropbox.clientID,
      secret: config.commons.dropbox.clientSecret,
      token: req.user.authToken,
      uid: req.user.dropbox.uid
    });

    client.mkdir('test', function(apiError, stats) {
      console.log(apiError);
      console.log(stats);
      return req.send();
    });

  });
  return app;
}
module.exports.mapRoutes = mapRoutes;