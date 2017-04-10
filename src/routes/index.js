'use strict';

import isAuthenticated from '../lib/helpers/isAuthenticated';

module.exports = (app) => {
  // [GET] Index > Dashboard
  app.get('/', (req, res) => res.redirect('/dashboard'));
};
