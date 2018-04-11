const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // this model is now loaded into mongoose, and can be accessed without 'require'.


// this function will be automatically called by passport with the user just fetched.
// this function generate the token and passport will put it in the cookie.
passport.serializeUser((user, done) => { // 'user' is the one after sign up/in process (below).
	done(null, user.id); // user.id is the user model instance id in mongo.
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

// Let passport use google strategy, and provide credentials, callback url, and token proccessing.
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true // otherwise the relative path above for redirect would be consider unsafe from google (return to http://... not https, so google says mismatch)
		}, 
		async (accessToken, refreshToken, profile, done) => {
			// check if profile id already exists; yes ? skip : create a user.
			// This a Asynchronous request when reach to mongo.
			const existingUser = await User.findOne({ googleID: profile.id });
				if(existingUser){
					return done(null, existingUser); // first param is the error object.
				}
				// no record, create and save a user id.
				const newUser = await new User({googleID: profile.id}).save();
				done(null, newUser);
		}
	)
);