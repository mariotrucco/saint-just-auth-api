'use strict';

var config = require('./config/config');
var mongoose = require('mongoose');
var passport = require('passport');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

//passport config
var Authenticate = require('./api/helpers/authenticate')
app.use(passport.initialize());


module.exports = app; // for testing

var swaggerConfig = {
		appRoot: __dirname // required config
};

mongoose.connect(config.mongoUrl);

//use native Promise, see http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("Connected correctly to server");
});


SwaggerExpress.create(swaggerConfig, function(err, swaggerExpress) {
	if (err) { throw err; }

	// install middleware
	swaggerExpress.register(app);

	var port = process.env.PORT || 10010;
	app.listen(port);

});
