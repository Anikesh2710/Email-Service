const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		// requireLogin : ensure the user is logged in to make payment.
		// just pass in the reference, so that express only call when there is an incoming request.


		// create a charge object via stripe
		// to bill the user
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for credits',
			source: req.body.id
		});
		
		// take the user and add credits,
		// and send the user model back to the db
		// Access the current user model via req.user (setup in passport js 
		// in index.js passport.initialize() passport.session()).
		req.user.credits += 5;
		// save to make the change to the user.
		// save is an async action
		const user = await req.user.save();
		// send back the user.
		res.send(user);
	});
}