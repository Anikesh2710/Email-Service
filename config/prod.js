// prod.js
// DO COMMIT THIS FILE
// these keys (process.env...) are setup on heroku - setting - config var
// these keys would be pulled from Heroku env variable.
module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	mongoURI: process.env.MONGO_URI,
	cookieKey: process.env.COOKIE_KEY,
	stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	strpeSecretKey: process.env.STRIPE_SECRET_KEY
};