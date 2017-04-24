'use strict';

var User = require('../models/user');
var passport = require('passport');
var Verify = require('../helpers/verify');

module.exports = {
		'login-by-credentials'	: loginByCredentials,
		'facebook'				: authenticateByFacebook,	
		'facebook-callback'		: facebookCallback,
		'google'				: authenticateByGoogle,	
		'google-callback'		: googleCallback
};


function loginByCredentials(req, res){

	passport.authenticate('local', function(err, user, info) {
		if (err) {
			console.log(err);
			return res.status(500).json(err.message);
		}
		if (!user) {
			return res.status(401).json(info.message);
		}
		req.logIn(user, function(err) {
			if (err) {
				return res.status(401).json(info.message);
			}
			var token = Verify.getToken(user);
			//TODO handle response object
			return res.status(200).json(token);	
		});
	})(req,res);	

}

function authenticateByFacebook(req, res){
	passport.authenticate('facebook', function(err, user, info) {
		console.log(err);
		return res.status(500).json(err.message);
	})(req,res);
}


function facebookCallback(req, res){
	
	passport.authenticate('facebook', function(err, user, info) {
		if (err) {
			console.log(err);
			return res.status(500).json(err.message);
		}
		if (!user) {
			return res.status(401).json(info.message);
		}
		req.logIn(user, function(err) {
			if (err) {
				console.log(err);
				return res.status(500).json(err.message);
			}
			var token = Verify.getToken(user);
			//TODO handle response object
			return res.status(200).json(token);	
		});
	})(req,res);
	
}

function authenticateByGoogle(req, res){
	passport.authenticate('google', { scope: ['profile'] }, function(err, user, info) {
		console.log(err);
		return res.status(500).json(err.message);
	})(req,res);
}


function googleCallback(req, res){
	
	passport.authenticate('google', function(err, user, info) {
		if (err) {
			console.log(err);
			return res.status(500).json(err.message);
		}
		if (!user) {
			return res.status(401).json(info.message);
		}
		req.logIn(user, function(err) {
			if (err) {
				console.log(err);
				return res.status(500).json(err.message);
			}
			var token = Verify.getToken(user);
			//TODO handle response object
			return res.status(200).json(token);	
		});
	})(req,res);
	
}




