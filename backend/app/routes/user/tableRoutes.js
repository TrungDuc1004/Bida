const express = require('express');
const router = express.Router();
const verifyToken = require('../../../middlewares/verifyToken');
const tableController = require('../../controllers/user/tableController');

router.post('/create', verifyToken, tableController.createTable);
router.get('/', tableController.getAllTables);
router.get('/:id', tableController.getTable);
router.put('/update/:id', verifyToken, tableController.updateTable);
router.delete('/:id', verifyToken, tableController.deleteTable);
router.get('/', verifyToken, tableController.getTableBySlug);
router.get('/available', verifyToken, tableController.getAvailableTables);

module.exports = router;
