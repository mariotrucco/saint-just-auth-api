'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var config = require('../../config/config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = config.facebook;
facebookConfig.profileFields = ['displayName','email'];
facebookConfig.callbackURL = config.baseUrl+'/login/facebook/callback';
exports.facebook = passport.use(new FacebookStrategy(facebookConfig, function(accessToken, refreshToken, profile, done){
	User.findOne({ 'oauth2.facebook.oauthId' : profile.id })
	.then(function(user) {
		if(user !== null){
			done(null, user);
		}else{
			console.dir(profile);
			var user = new User({
				username	: profile.displayName,
				email		: profile.email,
				verified	: true,
				insertDate	: new Date(),
				verifyDate	: new Date(),
			    oauth2: {
			        facebook: {
			            oauthId			: profile.id,
			            oauthToken		: accessToken,
			            refreshToken	: refreshToken
			        }
			    }
			});
			user.save()
			.then(function(){
				done(null, user);
			})
			.catch(function(err) {
				done(err);
			});
		}
	})
	.catch(function(err) {
		done(err);
	});
}));