// Import NPM Packages.
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');

// Import Config.
var config = require('./config');

// Import and Initialize Mongoose.
var mongoose = require('mongoose');
mongoose.connect(config.database.mongo.uri, function(error) {
	console.log((error) ? 'Database Connection Error: ' + error : 'Successfully Connected to MongoDB!');
});

var app = express();

// Application View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Application Middleware
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: config.express.session.secret, saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.'), root = namespace.shift(), formParam = root;
		while(namespace.length) formParam += '[' + namespace.shift() + ']';
		return { param : formParam, msg   : msg, value : value };
	}
}));

app.use(flash());
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});


// Application Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development Error Handler (stack-traces printed)
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {message: err.message, error: err});
  });
}

// Production Error Handler (no stack-traces printed)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {message: err.message, error: {}});
});

module.exports = app;