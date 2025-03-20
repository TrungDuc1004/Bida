const TableBooking = require('../../models/Booking');

// GET [/allbooking] - Lấy danh sách tất cả đặt bàn
exports.listAllBookings = (req, res) => {
    TableBooking.find()
        .then(bookings => res.json(bookings))
        .catch(error => res.status(500).json({ message: error.message }));
};

// DELETE [/allbooking/:id] - Xóa một đặt bàn theo ID
exports.deleteOneBooking = (req, res) => {
    TableBooking.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Booking deleted successfully' }))
        .catch(error => res.status(500).json({ message: error.message }));
};

