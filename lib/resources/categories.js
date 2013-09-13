var api = require('./');

function mapRoutes(app) {
  /**
   * Maping the endpoint for obtain a categories 
   * 
   * @param  {Request} req
   * @param  {Response} res
   * @return {void}
   */
  app.get('/api/categories', function (req, res) {
    res.send({categories:[]});
  });
  return app;
}
module.exports.mapRoutes = mapRoutes;