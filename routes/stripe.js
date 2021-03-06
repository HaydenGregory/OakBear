const express = require('express');
const stripeCtrl = require('../controllers/stripeCtrl.js')
const router = express.Router();

router.post('/register', stripeCtrl.register)
router.get('/refresh', stripeCtrl.refresh)
router.get('/complete', stripeCtrl.complete)
router.get('/get_seller', stripeCtrl.get)
router.post('/create-checkout-session', stripeCtrl.createCheckout)
router.get('/checkout_complete', stripeCtrl.checkoutComplete)
router.get('/checkout_canceled', stripeCtrl.checkoutCanceled)

module.exports = router;
