'use strict';

import isAuthenticated from '../lib/helpers/isAuthenticated';

module.exports = (app) => {
  // [GET] Index > Dashboard
  app.get('/', isAuthenticated, (req, res) => {
    if (req.user.type === 'individual') {
      res.redirect('/profile')
    }
    
    else if (req.user.type === 'organisation') {
      res.redirect('/dashboard')
    }
  });
};
