'use strict';

var mongoose = require('mongoose');
//use native Promise, see http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var beautifyUnique = require('mongoose-beautiful-unique-validation');

var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        required: false,
        index: true
    },
    verified: {
        type: Boolean,
        unique: false,
        required: true
    },
    verifyDate: {
        type: Date,
        unique: false,
        required: false
    },
    country: {
        type: String,
        unique: false,
        required: false,
        index: true
    },
    locale: {
        type: String,
        unique: false,
        required: false,
        index: true
    },
    timezone: {
        type: String,
        unique: false,
        required: false,
        index: true
    },
    insertDate: {
        type: Date,
        unique: false,
        required: true,
        index: true
    },
    oauth2: {
        facebook: {
            oauthId: {
                type: String,
                unique: true,
                index: true
            },
            oauthToken: String,
            refreshToken: String
        }
    }
});

User.plugin(passportLocalMongoose);
User.plugin(beautifyUnique);

module.exports = mongoose.model('User', User);
