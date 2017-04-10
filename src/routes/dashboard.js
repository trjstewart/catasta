'use strict';

import isAuthenticated from '../lib/helpers/isAuthenticated';

module.exports = (app) => {
  // [GET] Dashboard
  app.get('/dashboard', isAuthenticated, (req, res) => res.render('dashboard'));
};
