'use strict';

var Verify = require('../helpers/verify');
var ConfirmCode = require('../models/confirmCode');
var User = require('../models/user');
var randomstring = require("randomstring");
var moment = require('moment');
var elastic = require('elastic-email-api');
var config = require('../../config/config');
elastic.setApiKey(config.elasticemailAPIKey);

module.exports = {
		'generate-code' : generateCode,
		'confirm-email'	: confirmEmail
};

function generateCode(req, res){
	//TODO: register as global middleware
	Verify.verify(req, res, function(err){
		if (err) {
			console.log(err);
			return res.status(err.status).json(err.message);
		}
		if(req.loggedUser.verified){
			return res.status(403).json('User already verified on '+moment(req.loggedUser.verifyDate).format('MMMM Do YYYY, h:mm:ss a'));
		}
		
		var code = randomstring.generate();
		
		new ConfirmCode({
			_user		: req.loggedUser._id,
			code		: code,
			insertDate	: new Date(),
			expireDate	: moment().add(1, 'days').toDate(),
			operation	: 'confirm-email'
		})
		.save()
		.then(function(){
		    elastic.request({
			path: '/email/send',
			params: {
				template		: config.elasticemailConfirm+'_'+req.loggedUser.locale, 
			    to				: req.loggedUser.email,
			    merge_username	: req.loggedUser.username,
			    merge_url		: config.baseUrl+'/emails/'+code
			},
			callback: function (responseObj) {
				console.log(responseObj)
			}
		    });
		    return res.status(200).json('Email Sent!');
		})
		.catch(function(err) {
			return res.status(err.status).json(err.message);
		});

	});
}

function confirmEmail(req, res){
	ConfirmCode.findOne({code : req.swagger.params.code.value})
	.populate('_user')
	.then(function(doc) {
		if(!doc){
			return res.status(404).json('Confirmation code not found');
		}
		var userDoc = doc._user;
		if(userDoc.verified){
			return res.status(403).json('User already verified on '+moment(userDoc.verifyDate).format('MMMM Do YYYY, h:mm:ss a'));
		}
		if(doc.expireDate < new Date()){
			return res.status(403).json('Confirmation code expired');
		}
		userDoc.verified = true;
		userDoc.verifyDate = new Date();
		console.log(userDoc._id);
		console.log(userDoc);
		User.findByIdAndUpdate(userDoc._id, new User(userDoc), {new: true})
		.then(function(updatedUser){
			console.log(updatedUser);
			return res.status(200).json('User successfully verified');
		})
		.catch(function(err) {
			return res.status(err.status).json(err.message);
		});
	})
	.catch(function(err) {
		return res.status(err.status).json(err.message);
	});
}
