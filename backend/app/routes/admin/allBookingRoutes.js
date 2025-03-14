const express = require('express');
const verifyToken = require('../../../middlewares/verifyToken');
const router = express.Router();
const bookingController = require('../../controllers/admin/allBookingController');

router.get('/', verifyToken, bookingController.listAllBookings); // GET [/allbooking] - Lấy danh sách tất cả đặt bàn
router.delete('/:id', verifyToken, bookingController.deleteOneBooking);  // DELETE [/allbooking/:id] - Xóa đặt bàn

module.exports = router;
