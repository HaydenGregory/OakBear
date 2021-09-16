const express = require('express');
const stripeCtrl = require('../controllers/stripeCtrl.js')
const router = express.Router();

router.post('/register', stripeCtrl.register)
router.post('/refresh', stripeCtrl.refresh)

module.exports = router;
