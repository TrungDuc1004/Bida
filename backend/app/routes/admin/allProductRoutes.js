const express = require('express');
const verifyToken = require('../../../middlewares/verifyToken');
const router = express.Router();
const productController = require('../../controllers/admin/allProductController');

router.get('/', verifyToken, productController.listAllProduct); // get[/allproduct] DS Don hang
router.delete('/:id', verifyToken, productController.deleteOneProduct);  // delete[/allproduct/:id]

module.exports = router;