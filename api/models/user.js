'use strict';

var mongoose = require('mongoose');
//use native Promise, see http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var beautifyUnique = require('mongoose-beautiful-unique-validation');

var User = new Schema({
	username	: { type : String,	unique : true,	required : true		},
	email		: { type : String,	unique : true,	required : true		},
	verified	: { type : Boolean, unique : false, required : true	},
	verifyDate	: { type : Date,	unique : false, required : false	},
	country		: { type : String,	unique : false, required : true		},
	locale		: { type : String,	unique : false, required : true		},
	timezone	: { type : String,	unique : false, required : true		},
	insertDate	: { type : Date,	unique : false, required : true		}
});

User.plugin(passportLocalMongoose);
User.plugin(beautifyUnique);

module.exports = mongoose.model('User', User);
