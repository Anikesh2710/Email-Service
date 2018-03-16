//keys.js - figure out what set of credentials to return
// use enviroment variable from heroku

{
	// in production env - return the prod set of keys
	module.exports = require('./prod'); 
} else {
	// in dev env - return dev keys
	module.exports = require('./dev');
}
