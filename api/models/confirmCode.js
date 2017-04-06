'use strict';

var mongoose = require('mongoose');
var User = require('../models/user');

//use native Promise, see http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var ConfirmCode = new Schema({
	_user		: { type : ObjectId,	ref : 'User' },
	code		: { type : String,		unique : true,	required : true },
	insertDate	: { type : Date,		unique : false, required : true },
	expireDate	: { type : Date,		unique : false, required : true },
	operation	: { type : String,		unique : false, required : true }
});

module.exports = mongoose.model('ConfirmCode', ConfirmCode);
