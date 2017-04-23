'use strict';

import isAuthenticated from '../lib/helpers/isAuthenticated';

module.exports = (app) => {
  // [GET] Dashboard
  app.get('/dashboard', isAuthenticated, (req, res) => res.render('dashboard'));

  // [POST] Dashboard
  app.post('/dashboard', (req, res) => {
    console.log(req.body);
    res.redirect('/dashboard');
  });
};
