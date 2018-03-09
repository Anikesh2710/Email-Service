const express = require('express'); 
// common js module, requiring or sharing
// like import, but it's in ES 2015, not in node yet.
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

// app listens and handles requests
const app = express();

passport.use(new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, (accessToken) => {
		console.log(accessToken);
	})
);

// route handler for auth process
// the string 'google' is an internal identifier in GoogleStrategy
app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
		// the scope of info we're accessing from the user.
	})
);

//passport part

//Dynamic port binding.
//Look in the underlying environment and find the port to listen to.
const PORT = process.env.PORT || 5000; //5000 if in dev env or own machine.
app.listen(PORT);