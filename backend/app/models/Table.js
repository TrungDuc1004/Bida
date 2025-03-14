const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug); // Kích hoạt slug plugin

const Schema = mongoose.Schema;

const TableSchema = new Schema({
  name: { type: String, required: true }, // Tên bàn bida
  description: { type: String, maxLength: 600 }, // Mô tả bàn
  image: { type: String, maxLength: 255 }, // Link ảnh bàn bida
  slug: { type: String, slug: "name", unique: true }, // Slug tự động từ name
  status: { type: String, enum: ["available", "booked"], default: "available" }, // Trạng thái bàn
  oldPrice: { type: Number, required: true }, // Giá cũ
  newPrice: { type: Number, required: true }, // Giá mới
  location: { type: String, maxLength: 20 }, // Địa chỉ bàn bida
  category: { type: String, maxLength: 20 }, // Loại bàn
  quantity: { type: Number, default: 1, min: [1] }, // Số lượng bàn

  // 🏓 Thông tin đặt bàn
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Người đặt bàn
  bookedTime: { type: String, default: null }, // Thời gian đặt bàn
});

module.exports = mongoose.model("Table", TableSchema);
