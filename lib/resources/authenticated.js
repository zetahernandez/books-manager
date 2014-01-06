module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.json(403,{error : "not Authenticated"})
};