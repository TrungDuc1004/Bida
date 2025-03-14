const Table = require('../../models/Table');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

// 🏓 1️⃣ Tạo bàn bida mới (POST /tables/create)
exports.createTable = async (req, res) => {
    try {
        const { name, image, status } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!name || !image) {
            return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" });
        }

        const newTable = new Table({
            name,
            image,
            status: status || "available" // Mặc định bàn trống
        });

        await newTable.save();
        res.status(201).json({ message: "Thêm bàn thành công!", table: newTable });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm bàn!", error: error.message });
    }
};

// 🏓 2️⃣ Lấy thông tin một bàn bida (GET /tables/update/:id/edit)
exports.getTable = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: "Không tìm thấy bàn bida." });
        }
        res.status(200).json(table);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};

// 🏓 3️⃣ Cập nhật bàn bida (PUT /tables/update/:id)
exports.updateTable = async (req, res) => {
    try {
        const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!table) {
            return res.status(404).json({ message: "Không tìm thấy bàn bida." });
        }
        res.status(200).json({ message: "Cập nhật thành công!", table });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật!", error: error.message });
    }
};

// 🏓 4️⃣ Xóa bàn bida (DELETE /tables/:id)
exports.deleteTable = async (req, res) => {
    try {
        const table = await Table.findByIdAndDelete(req.params.id);
        if (!table) {
            return res.status(404).json({ message: "Không tìm thấy bàn bida để xóa." });
        }
        res.status(200).json({ message: "Bàn bida đã được xóa thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa bàn!", error: error.message });
    }
};

// 🏓 5️⃣ Lấy danh sách bàn bida (GET /tables)
exports.getTable = async (req, res) => {
    try {
        const { category, sort, q, page = 1, limit = 8 } = req.query;
        const skip = (page - 1) * limit;

        // Bộ lọc
        const filter = {};
        if (category && category !== "Tất cả") filter.category = category;
        if (q) filter.name = { $regex: q, $options: "i" }; // Tìm kiếm không phân biệt hoa thường

        const [tables, total] = await Promise.all([
            Table.find(filter)
                .sort(sort === "asc" ? { newPrice: 1 } : { newPrice: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Table.countDocuments(filter),
        ]);

        res.json({ data: tables, total, totalPages: Math.ceil(total / limit), page: parseInt(page) });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách bàn!", error: error.message });
    }
};

// 🏓 6️⃣ Lấy chi tiết bàn bida theo slug (GET /tables/:slug)
exports.getTableBySlug = async (req, res) => {
    try {
        const table = await Table.findOne({ slug: req.params.slug }).lean();
        if (!table) {
            return res.status(404).json({ message: "Không tìm thấy bàn bida." });
        }
        res.json(table);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thông tin bàn!", error: error.message });
    }
};

// 🏓 7️⃣ Đặt bàn bida (POST /tables/book)
exports.bookTable = async (req, res) => {
    try {
        const { tableId, userId, timeSlot } = req.body;

        // Kiểm tra đầu vào
        if (!tableId || !userId || !timeSlot) {
            return res.status(400).json({ message: "Thiếu thông tin đặt bàn!" });
        }

        const table = await Table.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: "Không tìm thấy bàn bida." });
        }

        // Kiểm tra bàn có trống không
        if (table.status !== "available") {
            return res.status(400).json({ message: "Bàn này đã được đặt!" });
        }

        // Cập nhật trạng thái bàn
        table.status = "booked";
        table.bookedBy = userId;
        table.bookedTime = timeSlot;
        await table.save();

        res.status(200).json({ message: "Đặt bàn thành công!", table });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi đặt bàn!", error: error.message });
    }
};

// 🏓 8️⃣ Hủy đặt bàn (POST /tables/cancel/:id)
exports.cancelBooking = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: "Không tìm thấy bàn bida." });
        }

        // Kiểm tra bàn đã đặt chưa
        if (table.status !== "booked") {
            return res.status(400).json({ message: "Bàn này chưa được đặt!" });
        }

        // Hủy đặt bàn
        table.status = "available";
        table.bookedBy = null;
        table.bookedTime = null;
        await table.save();

        res.status(200).json({ message: "Hủy đặt bàn thành công!", table });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi hủy đặt bàn!", error: error.message });
    }
};
