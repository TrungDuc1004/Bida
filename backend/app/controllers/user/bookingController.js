const Booking = require('../../models/Booking');

// POST [/booking] - Tạo đặt bàn mới
exports.createBooking = (req, res) => {
    const { tableId, startTime, endTime, numberOfPlayers, totalPrice } = req.body;
    const userId = req.user.userId; // Lấy userId từ token đăng nhập

    // Kiểm tra dữ liệu đầu vào
    if (!tableId || !startTime || !endTime || !numberOfPlayers) {
        return res.status(400).json({ success: false, message: 'Thiếu thông tin đặt bàn' });
    }

    // Tạo đặt bàn mới
    const newBooking = new Booking({
        userId,
        tableId,
        startTime,
        endTime,
        numberOfPlayers,
        totalPrice
    });

    newBooking.save()
        .then(savedBooking => res.status(201).json({ success: true, booking: savedBooking }))
        .catch(error => {
            console.error("Error creating booking:", error);
            res.status(500).json({ success: false, message: 'Lỗi máy chủ', error: error.message });
        });
};

// GET [/booking] - Lấy danh sách đặt bàn của người dùng hiện tại
exports.listBookings = (req, res) => {
    const userId = req.user.userId;
    Booking.find({ userId }).lean()
        .populate('tableId', 'name image location') // Lấy thông tin bàn bida
        .then(bookings => res.json(bookings))
        .catch(error => res.status(500).json({ message: error.message }));
};

// DELETE [/booking/:id] - Hủy đặt bàn
exports.cancelBooking = (req, res) => {
    Booking.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: 'Đặt bàn đã được hủy' }))
        .catch(error => res.status(500).json({ message: error.message }));
};

// PUT [/booking/:id] - Chỉnh sửa đặt bàn
exports.updateBooking = (req, res) => {
    Booking.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.status(200).json({ success: true }))
        .catch(error => res.status(500).json({ success: false, error: error.message }));
};
