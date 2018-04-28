const passport = require('passport');

module.exports = (app) => {
	// route handler for auth process
	// 'google' is an internal identifier in GoogleStrategy
	app.get('/auth/google', passport.authenticate('google', {
			scope: ['profile', 'email'] // the scope of info we're accessing from the user.
		})
	);

	// users redirected to this url with the Oauth 'code', and let passport handle it.
	app.get(
			'/auth/google/callback', 
			passport.authenticate('google'), // middleware
			(req, res) => {
				res.redirect('/surveys');	     // redirect
			}
		);

	app.get('/api/logout', (req, res) => {
		req.logout(); // kills the cookie.
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user); // lecture 42. passport automatically attach this user to the request body.
	});
};