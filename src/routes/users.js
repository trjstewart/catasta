'use strict';

import models from '../lib/db/models';
import isAuthenticated from '../lib/helpers/isAuthenticated';

module.exports = (app) => {
  // [GET] Account
  app.get('/account', isAuthenticated, (req, res) => {
    

    res.render('account', {  })
  });

  // [POST] Account
  app.post('/account', (req, res) => {
    res.redirect('/account');
  });

  // [GET] Profile
  app.get('/profile', isAuthenticated, (req, res) => res.render('profile'));

  // [POST] Profile
  app.post('/profile', (req, res) => {
    console.log(req.body);
    res.redirect('/profile');
  });

  // [GET] Validate Email Address
  app.get('/validate/:token', async (req, res) => {
    const user = await models.User.findOne({ where: { metadata: { verifyEmail: { token: req.params.token }}}}).catch(err => err);

    // Is there no result matching the token or has the token expired?
    if (!user || new Date().getTime() > user.metadata.verifyEmail.expires) {
      res.render('validate', { error: "Oops, it looks like that link has expired!" });
    }
    
    // The token was valid, validate the user.
    else {
      const updated = await user.updateAttributes({ verified: true });
      if (updated.errors) {
        res.render('validate', { error: 'Oops, it looks like that link has expired!' });
      }

      else {
        res.render('validate', { success: 'Successfully validated email!' });
      }
    }
  });
};

// metadata: {
//   verifyEmail: {
//     token: req.params.token
//   }
// }