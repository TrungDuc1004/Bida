const Table = require('../../models/Table');

// GET /tables - Lấy danh sách tất cả bàn bida
exports.getAllTables = async (req, res) => {
    try {
        const tables = await Table.find(); // Lấy tất cả bàn từ database
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách bàn!", error });
    }
};


// DELETE /tables/:id - Xóa một bàn bida theo ID
exports.deleteTable = (req, res) => {
    Table.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: 'Table deleted successfully' }))
        .catch(error => res.status(500).json({ message: error.message }));
};
