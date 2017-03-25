'use strict';
var moment = require('moment-timezone');
var Isemail = require('isemail');
var countries = require('country-data').countries;
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

exports.validateCountry = function(code){
	return Boolean(countries[code]) && countries[code].alpha2 === code;
}


exports.validateUser = function(user){
	if(!exports.validateTimezone(user.timezone)){
		return 'Invalid timezone';
	}
	if(!exports.validateEmail(user.email)){
		return 'Invalid email';
	}
	if(!exports.validateLocale(user.locale)){
		return 'Invalid locale';
	}
	if(!exports.validateCountry(user.country)){
		return 'Invalid country';
	}
	return null;
}