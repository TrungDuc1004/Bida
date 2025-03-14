const express = require('express');
const router = express.Router();
const Booking = require('../../models/Booking'); 
// const auth = require('../../../middlewares/auth'); 
const verifyToken = require('../../../middlewares/verifyToken');

// API đặt bàn
router.post('/', verifyToken, async (req, res) => {
    try {
        const {  tables, totalPrice } = req.body;

        if (tables.length === 0) {
            return res.status(400).json({ error: "Thiếu thông tin đặt bàn" });
        }

        // Kiểm tra xem bàn đã có ai đặt vào thời gian đó
        for (const table of tables) {
            const existingBooking = await Booking.findOne({
                "tables.tableId": table.tableId,
                "tables.time": table.time
            });

            if (existingBooking) {
                return res.status(400).json({ error: `Bàn ${table.name} đã có người đặt vào thời gian này.` });
            }
        }

        // Tạo đặt bàn mới
        const booking = new Booking({
            userId: req.user.userId,
            tables,
            totalPrice
        });

        await booking.save();
        res.json({ message: "Đặt bàn thành công!", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi server" });
    }
});

module.exports = router;
