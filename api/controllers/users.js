'use strict';

var User = require('../models/user');
var passport = require('passport');
var Verify = require('../helpers/verify');


/*

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

 */
module.exports = {
		'get-current'	: getCurrent,
		'get-by-id'		: getById,
		'register'      : register
};


function getCurrent(req, res){
	//TODO: register as global middleware
	Verify.verify(req, res, function(err){
		if (err) {
			console.log(err);
			return res.status(err.status).json(err.message);
		}
		//return res.status(200).json('TODO ME');
		return res.status(200).json(req.loggedUser);
	});
}

function getById(req, res){
	return res.status(200).json('TODO BY ID');
}

function register(req, res){

	User.register(
			new User({ 
				username	: req.swagger.params.user.value.username,
				email		: req.swagger.params.user.value.email,
				verified	: false,
				country		: req.swagger.params.user.value.country,
				locale		: req.swagger.params.user.value.locale,
				timezone	: req.swagger.params.user.value.timezone,
			}), 
			req.swagger.params.user.value.password, 
			function(err, user) {
				if (err) {
					console.log(err);
					//TODO handle error message
					return res.status(500).json('Registration Failed!');
				}
				passport.authenticate('local')(req, res, function () {
					return res.status(200).json('Registration Successful!');
				});
			}
	);	

}
