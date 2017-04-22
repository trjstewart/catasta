'use strict';

import config from '../config';
const stripe = require("stripe")(config.stripe.secret);
import isAuthenticated from '../lib/helpers/isAuthenticated';

module.exports = (app) => {
  // [GET] Checkout
  app.get('/checkout', (req, res) => res.render('checkout'));

  // [GET] Validate Coupon
  app.get('/validate-coupon', async (req, res) => {
    const coupon = await stripe.coupons.retrieve(req.query.coupon).catch(err => { return { valid: false }})
    res.json(coupon);





    // stripe.coupons.retrieve(
    //   "testcoupon",
    //   function(err, coupon) {
    //     if (err) {
    //       console.log(err);
    //       res.send(err);
    //     } else {
    //       console.log(coupon);
    //       res.send(coupon);
    //     }
    //   }
    // );
  });
  
  // [POST] Create Customer and Charge
  app.post("/charge", (req, res) => {
    let amount = 500;
    
    stripe.customers.create({
      email: req.body.email,
      card: req.body.id
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id
      }))
    .then(charge => {
      console.log(JSON.stringify(charge, null, 2))
      res.send(charge)
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({error: "Purchase Failed"});
    });
  });
};
