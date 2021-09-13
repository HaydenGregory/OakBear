const router = require('express').Router()
const itemCtrl = require('../controllers/itemCtrl')

router.route('/item')
    .get(itemCtrl.getItem)
    .post(itemCtrl.createItem)

router.route('/item/:id')
    .delete(itemCtrl.deleteItem)
    .put(itemCtrl.updateItem)

module.exports = router