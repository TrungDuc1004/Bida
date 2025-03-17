const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tables: [
        {
            tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
            name: { type: String, required: true },
            image: { type: String },
            location: { type: String, required: true },
            time: { type: Date, required: true }, // Thời gian đặt bàn
            numberOfPlayers: { type: Number, required: true, min: 1 } // Số người chơi
        }
    ],
    totalPrice: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
