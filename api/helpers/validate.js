'use strict';
var moment = require('moment-timezone');
var Isemail = require('isemail');


exports.validateTimezone = function(timezone){
	return moment.tz.zone(timezone) != null;
}

exports.validateEmail = function(email){
	if(!email){
		return false;
	}
	return Isemail.validate(email) === true;
}