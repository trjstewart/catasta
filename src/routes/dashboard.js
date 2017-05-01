'use strict';

import isAuthenticated from '../lib/helpers/isAuthenticated';

module.exports = (app) => {
  // [GET] Dashboard
  app.get('/dashboard', isAuthenticated, (req, res) => {
    if (req.user.type === 'organisation') {
      res.render('search')
    }

    else if (req.user.type === 'admin') {
      res.render('admin')
    }
  });

  // [POST] Search
  app.post('/search', (req, res) => {
    console.log(req.body);
    res.redirect('/dashboard');
  });
};
