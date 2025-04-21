const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: false },
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        description: { type: String, required: false },
        discount: { type: Number, default: 0 },
        selled: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;