const express = require('express');
const verifyToken = require('../../../middlewares/verifyToken');
const router = express.Router();
const orderController = require('../../controllers/user/orderController');

router.post('/', verifyToken, orderController.createOrder); // post[/order]
router.get('/', verifyToken, orderController.listOrder); // get[/order] DS Don hang

module.exports = router;