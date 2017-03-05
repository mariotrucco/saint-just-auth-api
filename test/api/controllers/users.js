'use strict';

var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('users', function() {

    describe('GET /users/me', function() {
    	
      it('should return 400 bad request for missing x-access-token', function(done) {

            request(server)
              .get('/users/me')
              .set('Accept', 'application/json')
              .expect(400)
              .end(function(err, res) {
            	
            	should.not.exist(err);
            	done();
            	
              });
      });      	
    	
    	
      it('should return 401 unauthorized because of wrong x-access-token', function(done) {

        request(server)
          .get('/users/me')
          .set('Accept', 'application/json')
          .set('x-access-token', 'aaaa')
          .expect('Content-Type', /json/)
          .expect(401)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.eql('You are not authenticated!');

            done();
          });
      });

    });

  });

});
