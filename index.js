const express = require('express');  // common js module, requiring or sharing like import, but it's in ES 2015, not in node yet.
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // express doesn't know about cookie.
const passport = require('passport'); // tell passport about cookie session.
const keys = require('./config/keys');
require('./models/User');
require('./services/passport'); // passport with google strategy, credentials, and callbacks.
const authRoutes = require('./routes/authRoutes')

mongoose.connect(keys.mongoURI); // connect mongoose to my remote mongoDB database.

const app = express(); // express instance app listens and handles requests.

app.use( // let express instance know about cookiesession.
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

// these two lines tells passport to 
// use cookies to handle authentications.
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);


//Dynamic port binding.
//Look in the underlying environment and find the port to listen to.
const PORT = process.env.PORT || 5000; //5000 if in dev env or own machine.
app.listen(PORT);