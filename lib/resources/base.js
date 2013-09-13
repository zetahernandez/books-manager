var api = require('./');

function mapRoutes(app,models) {
  app.get('/api/', function (req, res) {
    res.send({
      resources: [{
        type: "Volumes",
        description: "Returns all volumes",
        uri: req.url + "volumes"
      }, {
        type: "search",
        description: "Volumes Search",
        uri: req.url + "volumes"
      }]
    });
  });
  return app;
}
module.exports.mapRoutes = mapRoutes;