const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
//
const Schema = mongoose.Schema;

const ProductOrder = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    products: [
        {
            productId: { type: String, require: true },
            name: { type: String, require: true },
            image: { type: String, maxLength: 255 },
            newPrice: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    totalShipping: { type: Number, required: true },
}, {
    timestamps: true
})

module.exports = mongoose.model('ProductOrder', ProductOrder);