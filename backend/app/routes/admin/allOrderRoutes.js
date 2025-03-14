const express = require('express');
const verifyToken = require('../../../middlewares/verifyToken');
const router = express.Router();
const orderController = require('../../controllers/admin/allOrderController');

router.get('/', verifyToken, orderController.listAllOrder); // get[/allorder] DS Don hang
router.delete('/:id', verifyToken, orderController.deleteOneOrder);  // delete[/allorder/:id]

module.exports = router;