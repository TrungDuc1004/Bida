const express = require('express');
const router = express.Router();
const verifyToken = require('../../../middlewares/verifyToken');
const productController = require('../../controllers/user/productController');

router.post('/create', verifyToken, productController.createProduct); // post[/products/create]
router.get('/update/:id/edit', verifyToken, productController.getProduct); // get[/products/update/:id/edit]
router.put('/update/:id', verifyToken, productController.updateProduct); // put[/products/update/:id]
//
router.post('/createaccount', verifyToken, productController.createAccount); // post[/products/createaccount]
router.get('/update/:id/edit-account', verifyToken, productController.getAccount); // get[/products/update/:id/edit-account]
router.put('/update/:id/account', verifyToken, productController.updateAccount); // put[/products/update/:id/account]
//
router.get('/menu', productController.getMenu); // get[/products/menu]
router.get('/best-seller', productController.bestSeller); // get[/products/best-seller]
router.get('/:slug', productController.slug); // get[/products/:slug]

module.exports = router;
