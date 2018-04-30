const mongoose = require('mongoose');
const { Schema } = mongoose; //Schema = mongoose.Schema;

const userSchema = new Schema({
	googleID: String,
	credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema); // create a new collection, users.
// this model is now loaded into mongoose, and can be accessed without 'require'.