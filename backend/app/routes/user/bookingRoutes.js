
const express = require('express');
const router = express.Router();
// const auth = require('../../../middlewares/auth'); 
const verifyToken = require('../../../middlewares/verifyToken');
const bookingController = require('../../controllers/user/bookingController')
// API đặt bàn
router.post('/', verifyToken, bookingController.createBooking);
router.get('/list', verifyToken, bookingController.listBookings);
router.delete('/:id', verifyToken, bookingController.cancelBooking);
router.put('/:id', verifyToken, bookingController.updateBooking);
// router.put('/update', verifyToken, bookingController.updateBooking);
router.put('/table/status', verifyToken, bookingController.updateTableStatus);


module.exports = router;



