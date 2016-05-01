var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStratergy = require('passport-local');
var User = require('../models/user.model');

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password', 'Passwords don\'t match').equals(req.body.confirm_password);

	var errors = req.validationErrors();
	if (errors) {
		res.render('register', {errors: errors});
	} else {
		var newUser = new User({ email: req.body.email, password: req.body.password });
		User.createUser(newUser, function(err, user) {
			if (err) {
        // Error while creating user. Redirect to Login page and display error message.
        console.log('Error while registering user: ' + req.body.email);
        req.flash('error_msg', 'Oops! Looks like that email address is already registered...');
        res.redirect('/users/login');
      } else {
        // Successfully created user. Redirect to Login page and display success message.
        console.log('Successfully registered new user: ' + user.email);
        req.flash('success_msg', 'Thanks for registering with Catasta! You can now login.');
        res.redirect('/users/login');
      }
		});
	}
});

router.get('/login', function(req, res) {
	res.render('login');
});

passport.use(new LocalStratergy(function(username, password, done) {

}));

router.post('/login',
  passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
});

module.exports = router;