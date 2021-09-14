const express = require('express');
const userCtrl = require('../controllers/userCtrl')
const router = express.Router();

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);
router.get('/getuser', userCtrl.get);
router.delete('/delete', userCtrl.delete);
router.patch('/update', userCtrl.update);

module.exports = router;
