const express = require('express');
const stripeCtrl = require('../controllers/stripeCtrl.js')
const router = express.Router();

router.post('/register', stripeCtrl.register)
router.get('/refresh', stripeCtrl.refresh)
router.get('/complete', stripeCtrl.complete)
router.get('/get_seller', stripeCtrl.get)

module.exports = router;
