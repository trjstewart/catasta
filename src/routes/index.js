'use strict';

import isAuthenticated from '../lib/helpers/isAuthenticated';

module.exports = (app) => {
  // [GET] Index > Dashboard
  app.get('/', isAuthenticated, (req, res) => {
    if (req.user.type === 'individual') {
      if (!req.user.profile) req.flash('info', 'Please complete your profile to ensure you\'re listed in searches.');
      if (!req.user.subscription) req.flash('error', 'Subscription Inactive - Please update your subscription on the Account page.');
      res.redirect('/profile')
    }

    else if (req.user.type === 'organization') {
      req.flash('info', 'Please ensure your profile is completed...');
      res.redirect('/dashboard')
    }
    
  });
};
