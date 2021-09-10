const express = require('express');
const userCtrl = require('../controllers/userCtrl')
const router = express.Router();

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);

module.exports = router;
