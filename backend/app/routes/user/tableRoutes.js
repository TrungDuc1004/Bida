const express = require('express');
const router = express.Router();
const verifyToken = require('../../../middlewares/verifyToken');
const tableController = require('../../controllers/user/tableController');

router.post('/create', verifyToken, tableController.createTable);
router.get('/', tableController.getTable);
router.get('/:id', tableController.getTable);
router.put('/update/:id', verifyToken, tableController.updateTable);
router.delete('/:id', verifyToken, tableController.deleteTable);
router.post('/booking', verifyToken, tableController.bookTable);
router.post('/cancel/:id', verifyToken, tableController.cancelBooking);

module.exports = router;
