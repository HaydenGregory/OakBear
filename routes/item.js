const router = require('express').Router()
const itemCtrl = require('../controllers/itemCtrl')

router.route('/item')
    .get(itemCtrl.getItems)
    .post(itemCtrl.createItem)

router.route('/item/:id')
    .get(itemCtrl.getItem)
    .delete(itemCtrl.deleteItem)
    .put(itemCtrl.updateItem)
    
router.route('/item/checkout/:checkout_id')
    .get(itemCtrl.getItemCompleted)

module.exports = router