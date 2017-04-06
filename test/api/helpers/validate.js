'use strict';

var Validate = require('../../../api/helpers/validate');
var should = require('should');

describe('helpers', function() {
	
	describe('validate', function() {
		
		describe('validateTimezone', function() {
			
			it('should not accept null', function(done) {
				var isValid = Validate.validateTimezone(null);
				isValid.should.equal(false);
				done();
			});
					
			it('should accept "America/Los_Angeles"', function(done) {
				var isValid = Validate.validateTimezone('America/Los_Angeles');
				isValid.should.equal(true);
				done();
			});
			
			it('should not accept "America/Rome"', function(done) {
				var isValid = Validate.validateTimezone('America/Rome');
				isValid.should.equal(false);
				done();
			});
			
			it('should accept "Europe/Rome"', function(done) {
				var isValid = Validate.validateTimezone('Europe/Rome');
				isValid.should.equal(true);
				done();
			});
			
			it('should not accept undefined', function(done) {
				var isValid = Validate.validateTimezone();
				isValid.should.equal(false);
				done();
			});
			
		});
		
		describe('validateEmail', function() {
			
			it('should not accept null', function(done) {
				var isValid = Validate.validateEmail(null);
				isValid.should.equal(false);
				done();
			});
			
			
			it('should accept "test@iana.org"', function(done) {
				var isValid = Validate.validateEmail('test@iana.org');
				isValid.should.equal(true);
				done();
			});
			
			
			it('should accept "maccio.capatonda+test@gmail.com"', function(done) {
				var isValid = Validate.validateEmail('maccio.capatonda+test@gmail.com');
				isValid.should.equal(true);
				done();
			});
			
			it('should not accept "jackgmail.com"', function(done) {
				var isValid = Validate.validateEmail('jackgmail.com');
				isValid.should.equal(false);
				done();
			});
			
			it('should not accept undefined', function(done) {
				var isValid = Validate.validateEmail();
				isValid.should.equal(false);
				done();
			});
			
			
		});
		
		
		describe('validateLocale', function() {
			
			it('should not accept null', function(done) {
				var isValid = Validate.validateLocale(null);
				isValid.should.equal(false);
				done();
			});
			
			it('should accept "en-US"', function(done) {
				var isValid = Validate.validateLocale('en-US');
				isValid.should.equal(true);
				done();
			});
			
			it('should not accept "en-USA"', function(done) {
				var isValid = Validate.validateLocale('en-USA');
				isValid.should.equal(false);
				done();
			});
			
			it('should not accept undefined', function(done) {
				var isValid = Validate.validateLocale();
				isValid.should.equal(false);
				done();
			});
			
		});
		
		
		describe('validateCountry', function() {
			
			it('should not accept null', function(done) {
				var isValid = Validate.validateCountry(null);
				isValid.should.equal(false);
				done();
			});
			
			it('should accept "KZ"', function(done) {
				var isValid = Validate.validateCountry('KZ');
				isValid.should.equal(true);
				done();
			});
			
			it('should not accept "FRA"', function(done) {
				var isValid = Validate.validateCountry('FRA');
				isValid.should.equal(false);
				done();
			});
			
			it('should not accept undefined', function(done) {
				var isValid = Validate.validateCountry();
				isValid.should.equal(false);
				done();
			});
			
		});
	
	});
	
});
