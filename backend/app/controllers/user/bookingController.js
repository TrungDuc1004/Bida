const User = require("../../models/User")
const Booking = require('../../models/Booking');
const Table = require('../../models/Table');

// 🏓 Đặt bàn bida (POST /booking)
exports.createBooking = async (req, res) => {
    try {
        console.log("User từ token:", req.user);
        console.log("Request body:", req.body);
        const bookings = await Booking.find().populate("userId", "username")
        const { tables, totalPrice } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: "Bạn chưa đăng nhập hoặc phiên đăng nhập hết hạn!" });
        }
        // 🛑 Lấy thông tin userName từ User model
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "Không tìm thấy tài khoản!" });
        }

        const username = user.username;

        if (!tables || !Array.isArray(tables) || tables.length === 0) {
            return res.status(400).json({ error: "Danh sách bàn không hợp lệ!" });
        }

        // Kiểm tra bàn trống
        const conflicts = await Promise.all(
            tables.map(async (table) => {
                const existingBooking = await Booking.findOne({
                    "tables.tableId": table.tableId,
                    "tables.time": table.time
                });
                return existingBooking ? table.tableId : null;
            })
        );

        const bookedTables = conflicts.filter((tableId) => tableId !== null);
        if (bookedTables.length > 0) {
            return res.status(400).json({ error: `Bàn ${bookedTables.join(", ")} đã có người đặt!` });
        }

        // Đặt bàn: Cập nhật trạng thái bàn thành "booked"
        await Table.updateMany(
            { _id: { $in: tables.map(t => t.tableId) } },
            { status: "booked" }
        );

        // Tạo đơn đặt bàn
        const booking = new Booking({ 
            userId, 
            userName: username, 
            tables, 
            totalPrice, 
            status: "confirmed"
        });
        console.log("đã lưu", booking);
        
        await booking.save();

        res.status(201).json({ message: "Đặt bàn thành công!", booking });
    } catch (error) {
        console.error("Lỗi đặt bàn:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
};

// 🏓 Lấy danh sách đặt bàn của người dùng (GET /booking)
exports.listBookings = async (req, res) => {
    try {
        const userId = req.user.userId;
        const bookings = await Booking.find({ userId })
            .populate('tables.tableId', 'name image location') // Lấy thông tin chi tiết bàn
            .lean().sort({
                createdAt: -1
            });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🏓 Hủy đặt bàn (DELETE /booking/:id)
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Không tìm thấy đơn đặt bàn." });

        }
        
        booking.status = "canceled";
        await booking.save()
        // Cập nhật trạng thái bàn về "available"
        await Table.updateMany(
            { _id: { $in: booking.tables.map(t => t.tableId) } },
            { status: "available" }
        );

        // Xóa đơn đặt bàn
        await Booking.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Hủy đặt bàn thành công!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🏓 Chỉnh sửa đặt bàn (PUT /booking/:id)
// exports.updateBooking = async (req, res) => {
//     try {
//         const { tables, totalPrice } = req.body;

//         await Booking.findByIdAndUpdate(req.params.id, { tables, totalPrice });

//         res.status(200).json({ success: true, message: "Cập nhật đặt bàn thành công!" });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };
// cập nhập trạng thái bàn
exports.updateTableStatus = async (req, res) => {
    try {
        console.log("nhan request", req.params.tableId, req.body);

        const { status } = req.body;
        const { tableId } = req.params;

        if (!status) {
            return res.status(400).json({ error: "Trạng thái bàn không hợp lệ!" });
        }

        // Cập nhật trạng thái bàn
        const table = await Table.findByIdAndUpdate(tableId, { status }, { new: true });

        if (!table) {
            return res.status(404).json({ error: "Không tìm thấy bàn!" });
        }

        res.status(200).json({ message: "Cập nhật trạng thái bàn thành công!", table });
    } catch (error) {
        console.error("Lỗi cập nhật trạng thái bàn:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
};

// 🏓 Chỉnh sửa đặt bàn (PUT /booking/:id)
exports.updateBooking = async (req, res) => {
    try {
        console.log("Nhận request cập nhật đặt bàn:", req.params.id, req.body);

        const { time, numberOfPlayers } = req.body;
        const { id } = req.params;

        if (!time || !numberOfPlayers) {
            return res.status(400).json({ error: "Thời gian và số lượng người chơi không hợp lệ!" });
        }

        // Kiểm tra xem đặt bàn có tồn tại không
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ error: "Không tìm thấy đơn đặt bàn!" });
        }

        // Cập nhật thông tin đặt bàn
        booking.tables[0].time = time;
        booking.tables[0].numberOfPlayers = numberOfPlayers;
        await booking.save();

        res.status(200).json({ message: "Cập nhật đặt bàn thành công!", booking });
    } catch (error) {
        console.error("Lỗi khi cập nhật đặt bàn:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
};
