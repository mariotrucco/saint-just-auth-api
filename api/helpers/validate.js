'use strict';
var moment = require('moment-timezone');
var Isemail = require('isemail');
var locales = require('../../config/locales');


exports.validateTimezone = function(timezone){
	return moment.tz.zone(timezone) != null;
}

exports.validateEmail = function(email){
	if(!email){
		return false;
	}
	return Isemail.validate(email) === true;
}

exports.validateLocale = function(locale){
	return Boolean(locales.supported[locale]);
}