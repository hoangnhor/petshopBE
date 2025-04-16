const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true, min: 0 }, // Đảm bảo giá phải >= 0
        countInStock: { type: Number, required: true, min: 0 }, // Số lượng phải >= 0
        description: { type: String, required: true },
        discount: { type: Number, default: 0, min: 0, max: 100 }, // Giảm giá từ 0% đến 100%
        selled: { type: Number, default: 0, min: 0 } // Đảm bảo số lượng đã bán >= 0
    },
    {
        timestamps: true, // Tự động tạo các trường `createdAt` và `updatedAt`
    }
);

// Phương thức tính toán giá bán sau khi áp dụng giảm giá
ProductSchema.methods.getDiscountedPrice = function () {
    if (this.discount > 0) {
        return this.price - (this.price * this.discount) / 100;
    }
    return this.price; // Trả lại giá gốc nếu không có giảm giá
};

// Tạo mô hình sản phẩm từ schema
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
