'use strict';

var Verify = require('../helpers/verify');
var ConfirmCode = require('../models/confirmCode');
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
		
		var code = randomstring.generate();
		
		new ConfirmCode({
			_user		: req.loggedUser._id,
			code		: code,
			insertDate	: new Date(),
			expireDate	: moment().add(1, 'days').toDate(),
			operation	: 'confirm-email'
		}).save(function(error, data){
		    if(err){
		    	console.log(err);
				return res.status(err.status).json(err.message);
		    }else{
		    	
		    	elastic.request({
		    	    path: '/email/send',
		    	    params: {
		    	    	template		: 'test_confirmemail_it', 
		    	    	to				: req.loggedUser.email,
		    	    	merge_firstname	: req.loggedUser.username,
		    	    	merge_url		: 'http://localhost:10010/emails/'+code
		    	    },
		    	    callback: function (responseObj) {
		    	        console.log(responseObj)
		    	    }
		    	});
		    	
		    	
		    	return res.status(200).json('Email Sent!');
		    }
		});

	});
}

function confirmEmail(req, res){
	console.log('TODO confirm');
}