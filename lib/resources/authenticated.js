module.exports = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.json(401, {
		error: "not Authenticated"
	});
};