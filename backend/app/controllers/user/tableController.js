const Table = require('../../models/Table');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

// 🏓 1️⃣ Tạo bàn bida mới (POST /tables/create)
exports.createTable = async (req, res) => {
    try {
        const { name, image, description, oldPrice, newPrice, location, category, status } = req.body;

        if (!name || !image) {
            return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" });
        }

        const newTable = new Table({
            name,
            image,
            description,
            oldPrice,
            newPrice,
            location,
            category,
            status: status || "available" // Mặc định là bàn trống
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
exports.getAllTables = async (req, res) => {
    try {
        const { status, category, sort, q, page = 1, limit = 8 } = req.query;
        const skip = (page - 1) * limit;

        const filter = {};
        if (status) filter.status = status; // Lọc theo trạng thái nếu có
        if (category && category !== "Tất cả") filter.category = category;
        if (q) filter.name = { $regex: q, $options: "i" };

        const tables = await Table.find(filter)
            .sort(sort === "asc" ? { name: 1 } : { name: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        if (tables.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy bàn nào phù hợp!" });
        }

        res.json({ data: tables, total: tables.length });
    } catch (error) {
        console.error("Lỗi lấy danh sách bàn:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};
// 🏓 6️⃣ Lấy chi tiết bàn bida theo slug (GET /tables/:slug)
// exports.getTableBySlug = async (req, res) => {
//     try {
//         const table = await Table.findOne({ slug: req.params.slug }).lean();
//         if (!table) {
//             return res.status(404).json({ message: "Không tìm thấy bàn bida." });
//         }
//         res.json(table);
//     } catch (error) {
//         res.status(500).json({ message: "Lỗi khi lấy thông tin bàn!", error: error.message });
//     }
// };

// 🏓 Lấy danh sách bàn bida có thể đặt (GET /tables)
// 🏓 7️⃣ Cập nhật trạng thái bàn (PUT /tables/:id/status)
exports.updateTableStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Vui lòng cung cấp trạng thái bàn!" });
        }

        const table = await Table.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!table) {
            return res.status(404).json({ message: "Không tìm thấy bàn bida." });
        }

        res.status(200).json({ message: "Cập nhật trạng thái bàn thành công!", table });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật trạng thái bàn!", error: error.message });
    }
};

