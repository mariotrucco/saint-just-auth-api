'use strict';

var User = require('../models/user');
var jwt = require('jsonwebtoken'); 
var config = require('../../config/config');

exports.getToken = function (user) {
	return jwt.sign(user, config.secretKey, {
		expiresIn: 3600
	});
};

exports.verify = function (req, res, next) {
	var token = req.swagger.params['x-access-token'].value;

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, config.secretKey, function (err, decoded) {
			if (err) {
				var err = new Error('You are not authenticated!');
				err.status = 401;
				return next(err);
			} else {
				// if everything is good, save to request for use in other routes
				req.loggedUser = new User(decoded._doc);
				next();
			}
		});
	} else {
		// if there is no token
		// return an error
		var err = new Error('No token provided!');
		err.status = 403;
		return next(err);
	}
};
