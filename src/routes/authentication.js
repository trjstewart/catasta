'use strict';
import bcrypt from 'bcryptjs';
import models from '../lib/db/models';


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

import isAuthenticated from '../lib/helpers/isAuthenticated';

module.exports = (app) => {
  // Register
  app.get('/register', (req, res) => {
    const type = req.query.type || 'individual';
    res.render('register', { type: type });
  });

  // [GET] Login Form
  app.get('/login', (req, res) => res.render('login'));

  app.get('/test', (req, res) => { 
    req.flash('success', 'Registration Successful! You can now Login.')
    res.redirect('/login')
  });
  
  // [POST] Registration Request
  app.post('/register', async (req, res) => {
    // Sanitization
    const form = ['firstName', 'lastName', 'email', 'password', 'passwordv'];
    for (let i = 0; i < form.length; i += 1) {
      req.sanitize(form[i]).escape();
      req.sanitize(form[i]).trim();
    }
    
    // Sanitise and Validate all Form Inputs
    req.checkBody('firstName', 'Please Enter Your First Name').notEmpty();
    req.checkBody('lastName', 'Please Enter Your Last Name').notEmpty();
    req.checkBody('email', 'Please Enter Your Email').notEmpty();
    req.checkBody('password', 'Please Enter Both Password Fields').notEmpty();
    req.checkBody('passwordv', 'Please Enter Both Password Fields').notEmpty();
    req.checkBody('password', 'Please Enter A Longer Password').len(6);
    req.checkBody('password', 'Passwords Do Not Match').equals(req.body.passwordv);
    
    const errors = req.validationErrors();
    
    console.log(`Got to here with ${errors.length} Errors.`);
    
    if (errors) {
      // Redirect the User back to the Registration form with the Errors.
      res.render('register', {
        errors: errors.map(obj => obj.msg), firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, type: req.body.type
      });
    } else {
      const user = await models.User.create({
        firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password, type: req.body.type,
      }).catch(err => err);
      
      if (!user.errors) {
        req.flash('success', 'Registration Successful! You can now Login.')
        res.redirect('/login')
      } else {
        // Redirect the User back to the Registration form with the Errors.
        res.render('register', {
          errors: [(user.errors[0].path === 'email') ? 'That email address is already in use.' : 'Oops! Something went wrong, please try again.'],
          firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, type: req.body.type
        });
      }
    }
  });

  // passport.use(new LocalStrategy(
  //   function(username, password, done) {
  //    User.getUserByUsername(username, function(err, user){
  //    	if(err) throw err;
  //    	if(!user){
  //    		return done(null, false, {message: 'Unknown User'});
  //    	}
  
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

  // passport.use(new LocalStrategy((username, password, done) => {
  //   const user = { id: 1234, firstName: 'Tylor', lastName: 'Stewart' };
  //   return done(null, user);
  // }));

  passport.use(new LocalStrategy(async (username, password, done) => {
    // Check if the user exists.
    const user = await models.User.findOne({ where: { email: username }}).catch(err => err);
    if (!user) return done(null, false, {message: 'Invalid Username or Password'});

    const valid = await bcrypt.compareSync(password, user.password);

    return (valid) ? done(null, user) : done(null, false, {message: 'Invalid Username or Password'});
  }));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    const user = await models.User.findOne({ where: { id: id }}).catch(err => err);
    done(null, user);
  });

  app.post('/login',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login', failureFlash: true}),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get('/logout', function(req, res){
  	req.logout();
  	req.flash('success', 'You have been logged out');
  	res.redirect('/login');
  });
  
  app.post('/update-email-test', async (req, res) => {
    console.log(`Updating email for ${req.body.user} to ${req.body.email}`);
    if (req.body.user && req.body.email) {
      const user = await models.User.update({ email: req.body.email, verified: false }, { where: { id: req.body.user }})
        .then(user => res.send(true))
        .catch(err => console.log(err))
    } else {
      res.send(false)
    }
    
  })
};
