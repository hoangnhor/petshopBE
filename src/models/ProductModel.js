const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        countInStock: { type: Number, required: true, min: 0 },
        description: { type: String, required: true },
        discount: { type: Number },
        sold: { type: Number } // Sửa từ selled thành sold
    },
    {
        timestamps: true,
        indexes: [
            { key: { type: 1 } }, // Index cho type
            { key: { price: 1 } } // Index cho price
        ]
    }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;