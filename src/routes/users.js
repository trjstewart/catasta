'use strict';

import isAuthenticated from '../lib/helpers/isAuthenticated';

module.exports = (app) => {
  // [GET] Account
  app.get('/account', isAuthenticated, (req, res) => res.render('account'));

  // [POST] Account
  app.post('/account', (req, res) => {
    console.log(req.body);
    res.redirect('/account');
  });

  // [GET] Profile
  app.get('/profile', isAuthenticated, (req, res) => res.render('profile'));

  // [POST] Profile
  app.post('/profile', (req, res) => {
    console.log(req.body);
    res.redirect('/profile');
  });
};
