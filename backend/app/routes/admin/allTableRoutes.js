const express = require('express');
const verifyToken = require('../../../middlewares/verifyToken');
const router = express.Router();
const tableController = require('../../controllers/admin/allTableController');

router.get('/', verifyToken, tableController.getAllTables); 
router.delete('/:id', verifyToken, tableController.deleteTable); 

module.exports = router;