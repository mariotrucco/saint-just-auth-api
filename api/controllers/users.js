'use strict';

var User = require('../models/user');
var passport = require('passport');
var Verify = require('../helpers/verify');
var validate = require('../helpers/validate');


module.exports = {
		'get-current'	: getCurrent,
		'register'      : register
};


function getCurrent(req, res){
	//TODO: register as global middleware
	Verify.verify(req, res, function(err){
		if (err) {
			console.log(err);
			return res.status(err.status).json(err.message);
		}
		return res.status(200).json(req.loggedUser);
	});
}

function register(req, res){

	if(!validate.validateTimezone(req.swagger.params.user.value.timezone)){
		return res.status(500).json('Inavlid timezone');
	}
	
	User.register(
			new User({ 
				username	: req.swagger.params.user.value.username,
				email		: req.swagger.params.user.value.email,
				verified	: false,
				country		: req.swagger.params.user.value.country,
				locale		: req.swagger.params.user.value.locale,
				timezone	: req.swagger.params.user.value.timezone,
				insertDate	: new Date()
			}), 
			req.swagger.params.user.value.password, 
			function(err, user) {
				if (err) {
					console.log(err);
					//TODO better error handling
					if(err.errors && err.errors.email){
						return res.status(500).json(err.errors.email.message+", kind: "+err.errors.email.kind);
					}
					
					return res.status(500).json(err.message);
				}
				passport.authenticate('local')(req, res, function () {
					return res.status(200).json('Registration Successful!');
				});
			}
	);	

}
