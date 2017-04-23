'use strict';
import models from '../lib/db/models';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

import isAuthenticated from '../lib/helpers/isAuthenticated';

module.exports = (app) => {
  // Register
  app.get('/register', (req, res) => res.render('register'));

  // [GET] Login Form
  app.get('/login', (req, res) => res.render('login'));
  
  // [POST] Registration Request
  app.post('/register', async (req, res) => {
    // Sanitization
    const form = ['firstName', 'lastName', 'email', 'password', 'passwordv'];
    for (let i = 0; i < form.length; i += 1) {
      req.sanitize(`reg_${form[i]}`).escape();
      req.sanitize(`reg_${form[i]}`).trim();
    }
    
    // Sanitise and Validate all Form Inputs
    req.checkBody('reg_firstName', 'Please Enter Your First Name').notEmpty();
    req.checkBody('reg_lastName', 'Please Enter Your Last Name').notEmpty();
    req.checkBody('reg_email', 'Please Enter Your Email').notEmpty();
    req.checkBody('reg_password', 'Please Enter Both Password Fields').notEmpty();
    req.checkBody('reg_passwordv', 'Please Enter Both Password Fields').notEmpty();
    req.checkBody('reg_password', 'Please Enter A Longer Password').len(6);
    req.checkBody('reg_password', 'Passwords Do Not Match').equals(req.body.reg_passwordv);
    
    const errors = req.validationErrors();
    
    console.log(`Got to here with ${errors.length} Errors.`);
    
    if (errors) {
      // Redirect the User back to the Registration form with the Errors.
      res.render('register', {
        error: errors.map(obj => obj.msg),
        retryRegFirstName: req.body.reg_firstName,
        retryRegLastName: req.body.reg_lastName,
        retryRegEmail: req.body.reg_email,
      });
    } else {
      console.log(`Got to here!`);
      const user = await models.User.create({
        firstName: req.body.reg_firstName,
        lastName: req.body.reg_lastName,
        email: req.body.reg_email,
        password: req.body.reg_password,
        type: 'individual',
      }).catch(err => { throw err });
      console.log(user);



      console.log(`Got to here!`);
      req.flash('success_msg', 'You are registered and can now login');
      res.redirect('/login');
  
      // models.User.findAll().then(users => console.log(users));
      
      
      // models.User.create({
      //   firstName: req.body.reg_firstName,
      //   lastName: req.body.reg_lastName,
      //   email: req.body.reg_email,
      //   password: req.body.reg_password,
      // })
      //   .then(() => {
      //     res.redirect('/');
      //   })
      //   .catch(() => {
      //     res.render('register', {
      //       errors: ['Couldn\' register, is your email already in use?'],
      //       retryFirstName: req.body.reg_firstName,
      //       retryLastName: req.body.reg_lastName,
      //       retryEmail: req.body.reg_email,
      //     });
      //   });
    }
  });
  
  
  
  
  
  
  
  
  
  
  
  
  

  // // Register User
  // app.post('/register', function(req, res){
  // 	var name = req.body.name;
  // 	var email = req.body.email;
  // 	var username = req.body.username;
  // 	var password = req.body.password;
  // 	var password2 = req.body.password2;
  //
  // 	// Validation
  // 	req.checkBody('name', 'Name is required').notEmpty();
  // 	req.checkBody('email', 'Email is required').notEmpty();
  // 	req.checkBody('email', 'Email is not valid').isEmail();
  // 	req.checkBody('username', 'Username is required').notEmpty();
  // 	req.checkBody('password', 'Password is required').notEmpty();
  // 	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  //
  // 	var errors = req.validationErrors();
  //
  // 	if(errors){
  // 		res.render('register',{
  // 			errors:errors
  // 		});
  // 	} else {
  // 		var newUser = new User({
  // 			name: name,
  // 			email:email,
  // 			username: username,
  // 			password: password
  // 		});
  //
  // 		User.createUser(newUser, function(err, user){
  // 			if(err) throw err;
  // 			console.log(user);
  // 		});
  //
  // 		req.flash('success_msg', 'You are registered and can now login');
  //
  // 		res.redirect('/users/login');
  // 	}
  // });

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
  
  app.post('/update-email-test', (req, res) => {
    console.log(`Updating email for ${req.body.user} to ${req.body.email}`);
    if (req.body.user && req.body.email) {
      models.User.update({ email: req.body.email }, { where: { id: req.body.user }})
        .then(user => res.send(true))
        .catch(err => console.log(err))
    } else {
      res.send(false)
    }
    
  })
};
