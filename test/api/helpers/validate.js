'use strict';

var validate = require('../../../api/helpers/validate');
var should = require('should');

describe('helpers', function() {
	
	describe('validate', function() {
		
		describe('validateTimezone', function() {
			
			it('should not accept null', function(done) {
				var isValid = validate.validateTimezone(null);
				isValid.should.equal(false);
				done();
			});
					
			it('should accept "America/Los_Angeles"', function(done) {
				var isValid = validate.validateTimezone('America/Los_Angeles');
				isValid.should.equal(true);
				done();
			});
			
			it('should not accept "America/Rome"', function(done) {
				var isValid = validate.validateTimezone('America/Rome');
				isValid.should.equal(false);
				done();
			});
			
			it('should accept "Europe/Rome"', function(done) {
				var isValid = validate.validateTimezone('Europe/Rome');
				isValid.should.equal(true);
				done();
			});
			
			it('should not accept undefined', function(done) {
				var isValid = validate.validateTimezone();
				isValid.should.equal(false);
				done();
			});
			
		});
	
	});
	
});