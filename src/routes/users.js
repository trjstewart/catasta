'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

import isAuthenticated from '../lib/helpers/isAuthenticated';

module.exports = (app) => {


  // Register
  app.get('/register', (req, res) => res.render('register'));

  // [GET] Login Form
  app.get('/login', (req, res) => res.render('login'));

  // Register User
  app.post('/register', function(req, res){
  	var name = req.body.name;
  	var email = req.body.email;
  	var username = req.body.username;
  	var password = req.body.password;
  	var password2 = req.body.password2;

  	// Validation
  	req.checkBody('name', 'Name is required').notEmpty();
  	req.checkBody('email', 'Email is required').notEmpty();
  	req.checkBody('email', 'Email is not valid').isEmail();
  	req.checkBody('username', 'Username is required').notEmpty();
  	req.checkBody('password', 'Password is required').notEmpty();
  	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  	var errors = req.validationErrors();

  	if(errors){
  		res.render('register',{
  			errors:errors
  		});
  	} else {
  		var newUser = new User({
  			name: name,
  			email:email,
  			username: username,
  			password: password
  		});

  		User.createUser(newUser, function(err, user){
  			if(err) throw err;
  			console.log(user);
  		});

  		req.flash('success_msg', 'You are registered and can now login');

  		res.redirect('/users/login');
  	}
  });

  // passport.use(new LocalStrategy(
  //   function(username, password, done) {
  //    User.getUserByUsername(username, function(err, user){
  //    	if(err) throw err;
  //    	if(!user){
  //    		return done(null, false, {message: 'Unknown User'});
  //    	}
  //
  //    	User.comparePassword(password, user.password, function(err, isMatch){
  //    		if(err) throw err;
  //    		if(isMatch){
  //    			return done(null, user);
  //    		} else {
  //    			return done(null, false, {message: 'Invalid password'});
  //    		}
  //    	});
  //    });
  //   }));

  passport.use(new LocalStrategy((username, password, done) => {
    const user = { id: 1234, firstName: 'Tylor', lastName: 'Stewart' };
    return done(null, user);
  }));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    const user = { id: 1234, firstName: 'Tylor', lastName: 'Stewart' };
    done(null, user);
  });

  app.post('/login',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login',failureFlash: true}),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/logout', function(req, res){
  	req.logout();
  	req.flash('success_msg', 'You are logged out');
  	res.redirect('/login');
  });
};
