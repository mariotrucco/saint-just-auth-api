'use strict';

var User = require('../models/user');
var passport = require('passport');
var Verify = require('../helpers/verify');

module.exports = {
		'login-by-credentials' : loginByCredentials
};


function loginByCredentials(req, res){

	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
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

