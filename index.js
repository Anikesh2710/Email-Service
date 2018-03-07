const express = require('express'); 
// common js module, requiring or sharing
// like import, but it's in ES 2015, not in node yet.
const app = express();
// listen and handle requests

//a route handler
app.get('/', (req, res) => {
	res.send({hi: 'there'});
});

//Dynamic port binding.
//Look in the underlying environment and find the port to listen to.
const PORT = process.env.PORT || 5000; //5000 if in dev env or own machine.
app.listen(PORT);