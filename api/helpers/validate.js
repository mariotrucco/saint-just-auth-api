'use strict';
var moment = require('moment-timezone');


exports.validateTimezone = function(timezone){
	return moment.tz.zone(timezone) != null;
}