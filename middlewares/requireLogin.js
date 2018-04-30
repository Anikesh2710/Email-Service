module.exports = (req, res, next) => {
	if(!req.user) {
		// stop the middleware chain right here, otherwise more error.
		return res.status(403).send({ error: 'You must log in!'});
	}
	next();
};