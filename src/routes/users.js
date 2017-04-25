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
  app.get('/profile', isAuthenticated, (req, res) => {
    if (req.user.type === 'individual') res.render('profile-ind')
    else if (req.user.type === 'organization') res.render('profile-org')
  });

  // [POST] Profile
  app.post('/profile', async (req, res) => {
    console.log(req.body);

    const update = await models.User.update({ profile: req.body }, { where: { id: req.user.id }});
    console.log(update);

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