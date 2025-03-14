const express = require('express');
const verifyToken = require('../../../middlewares/verifyToken');
const router = express.Router();
const accountController = require('../../controllers/admin/allAccountController');

router.get('/', verifyToken, accountController.listAllAccount); // get[/allaccount] DS Don hang
router.delete('/:id', verifyToken, accountController.deleteOneAccount);  // delete[/allaccount/:id]

module.exports = router;