const express = require('express');  // common js module, requiring or sharing like import, but it's in ES 2015, not in node yet.
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // express doesn't know about cookie.
const passport = require('passport'); // tell passport about cookie session.
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport'); // passport with google strategy, credentials, and callbacks.
const authRoutes = require('./routes/authRoutes')
const billingRoutes = require('./routes/billingRoutes');

// connect mongoose to my remote mongoDB database.
mongoose.connect(keys.mongoURI); 

// An express instance, app, listens and handles requests.
const app = express(); 

// app.use weirs up middleware.

// Parse any request with a body, and put the body inside req.body
app.use(bodyParser.json()); 

// let express instance know about cookiesession.
app.use( 
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

// these two lines tells passport to 
// use cookies to handle authentications.
app.use(passport.initialize());
app.use(passport.session());


// these are routes handlers.
// they take an express instance (app) and register different routes and methods
authRoutes(app);
billingRoutes(app);

// these lines run in prod mode
if(process.env.NODE_ENV === 'production') {
	// Express will serve production assets
	app.use(express.static('client/build'));
	// if not found in 'client/build' then 
	// Express will serve index.html file if the path is not defined in Express
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}


//Dynamic port binding.
//Look in the underlying environment and find the port to listen to.
const PORT = process.env.PORT || 5000; //5000 if in dev env or own machine. 
app.listen(PORT);
