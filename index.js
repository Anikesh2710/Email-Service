const express = require('express'); 
// common js module, requiring or sharing
// like import, but it's in ES 2015, not in node yet.
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// app listens and handles requests
const app = express();

// client iD 214020500968-15h6qb5sb6725s8kdqsf3eqcbal8mpt5.apps.googleusercontent.com
// client secret ZmUUn2QjEiLIYEdR7xhCQEda
passport.use(new GoogleStrategy());

//a route handler


//passport part

//Dynamic port binding.
//Look in the underlying environment and find the port to listen to.
const PORT = process.env.PORT || 5000; //5000 if in dev env or own machine.
app.listen(PORT);