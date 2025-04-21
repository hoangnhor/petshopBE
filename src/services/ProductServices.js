const Product = require("../models/ProductModel");
const Type = require("../models/TypeModel");

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, description } = newProduct;
        try {
            if (!name || !price || !countInStock || !type) {
                return resolve({
                    status: 'ERR',
                    message: 'Thiếu thông tin bắt buộc: name, price, countInStock, type',
                });
            }
            const checkProduct = await Product.findOne({ name });
            if (checkProduct !== null) {
                return resolve({
                    status: 'ERR',
                    message: 'Tên sản phẩm đã tồn tại',
                });
            }
            const checkType = await Type.findById(type);
            if (!checkType) {
                return resolve({
                    status: 'ERR',
                    message: 'Loại sản phẩm không tồn tại',
                });
            }
            const createdProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                description,
            });
            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: createdProduct,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });
            if (!checkProduct) {
                return resolve({
                    status: 'ERR',
                    message: 'Sản phẩm không tồn tại',
                });
            }
            if (data.name) {
                const nameCheck = await Product.findOne({ name: data.name, _id: { $ne: id } });
                if (nameCheck) {
                    return resolve({
                        status: 'ERR',
                        message: 'Tên sản phẩm đã tồn tại',
                    });
                }
            }
            if (data.type) {
                const checkType = await Type.findById(data.type);
                if (!checkType) {
                    return resolve({
                        status: 'ERR',
                        message: 'Loại sản phẩm không tồn tại',
                    });
                }
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: updatedProduct,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });
            if (!checkProduct) {
                return resolve({
                    status: 'ERR',
                    message: 'Sản phẩm không tồn tại',
                });
            }
            await require("../models/WarehouseModel").deleteMany({ idsp: id });
            await Product.findByIdAndDelete(id);
            return resolve({
                status: 'OK',
                message: 'Xóa thành công',
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const parsedLimit = parseInt(limit) || 10;
            const parsedPage = parseInt(page) || 0;
            const totalProduct = await Product.countDocuments();

            let query = Product.find().populate('type');

            if (filter) {
                const label = filter[0];
                const allObjectFilter = await query
                    .find({ [label]: { $regex: filter[1], $options: 'i' } })
                    .limit(parsedLimit)
                    .skip(parsedPage * parsedLimit);
                return resolve({
                    status: 'OK',
                    message: 'Thành công',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: parsedPage + 1,
                    totalPage: Math.ceil(totalProduct / parsedLimit),
                });
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allProductSort = await query
                    .limit(parsedLimit)
                    .skip(parsedPage * parsedLimit)
                    .sort(objectSort);
                return resolve({
                    status: 'OK',
                    message: 'Thành công',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: parsedPage + 1,
                    totalPage: Math.ceil(totalProduct / parsedLimit),
                });
            }

            const allProduct = await query
                .limit(parsedLimit)
                .skip(parsedPage * parsedLimit);

            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: allProduct,
                total: totalProduct,
                pageCurrent: parsedPage + 1,
                totalPage: Math.ceil(totalProduct / parsedLimit),
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({ _id: id }).populate('type');
            if (!product) {
                return resolve({
                    status: 'ERR',
                    message: 'Sản phẩm không tồn tại',
                });
            }
            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: product,
            });
        } catch (e) {
            reject(e);
        }
    });
};
const searchProduct = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm kiếm sản phẩm có name chứa keyword (không phân biệt hoa thường)
            const products = await Product.find({
                name: { $regex: keyword, $options: 'i' }
            }).populate('type');

            // Kiểm tra nếu không tìm thấy sản phẩm
            if (products.length === 0) {
                return resolve({
                    status: 'ERR',
                    message: 'Không có',
                });
            }

            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: products,
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message || 'Lỗi không xác định trong searchProduct',
                stack: e.stack,
            });
        }
    });
};
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    searchProduct,
};