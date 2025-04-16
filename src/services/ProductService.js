const Product = require("../models/ProductModel");

// Tạo API sản phẩm
const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, description } = newProduct;
        try {
            const checkProduct = await Product.findOne({ name });
            if (checkProduct !== null) {
                throw new Error('ten san pham da ton tai');
            }
            const createdProduct = await Product.create({
                name, image, type, price, countInStock, description
            });
            resolve({
                data: createdProduct
            });
        } catch (e) {
            if (e.name === 'ValidationError') throw new Error(e.message);
            reject(e);
        }
    });
};

// Cập nhật sản phẩm
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });
            if (!checkProduct) {
                throw new Error('san pham khong xac dinh');
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
            resolve({
                data: updatedProduct
            });
        } catch (e) {
            if (e.name === 'CastError') throw new Error('Invalid ID');
            reject(e);
        }
    });
};

// Xóa sản phẩm
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });
            if (!checkProduct) {
                throw new Error('san pham khong ton tai');
            }
            await Product.findByIdAndDelete(id);
            resolve({
                message: 'xoa thanh cong'
            });
        } catch (e) {
            if (e.name === 'CastError') throw new Error('Invalid ID');
            reject(e);
        }
    });
};

// Lấy tất cả sản phẩm
const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = Product.find();
            if (filter) {
                const [label, value] = filter;
                query = query.where(label).regex(new RegExp(value, 'i'));
            }
            if (sort) {
                const [order, field] = sort;
                query = query.sort({ [field]: order === 'asc' ? 1 : -1 });
            }
            const totalProduct = await Product.countDocuments(query);
            const allProduct = await query.limit(limit).skip(page * limit);
            resolve({
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Lấy chi tiết sản phẩm
const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({ _id: id });
            if (!product) {
                throw new Error('san pham khong ton tai');
            }
            resolve({
                data: product
            });
        } catch (e) {
            if (e.name === 'CastError') throw new Error('Invalid ID');
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
};