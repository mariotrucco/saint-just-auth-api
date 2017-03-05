'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	username	: String,
	email		: String,
	verified	: Boolean,
	country		: String,
	locale		: String,
	timezone	: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
