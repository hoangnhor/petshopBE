const Product = require("../models/ProductModel");

// Tạo API sản phẩm
const createProduct = (productData) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, description } = productData;
        try {
            const checkProduct = await Product.findOne({ name: name });
            if (checkProduct !== null) {
                return reject({
                    status: 'ERR',
                    message: 'Tên sản phẩm đã tồn tại'
                });
            }

            // Tạo sản phẩm
            const newProduct = await Product.create({
                name, image, type, price, countInStock, description
            });

            if (newProduct) {
                return resolve({
                    status: 'OK',
                    message: 'Thêm sản phẩm thành công',
                    data: newProduct
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

// Cập nhật sản phẩm
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });
            if (checkProduct === null) {
                return reject({
                    status: 'ERR',
                    message: 'Sản phẩm không xác định'
                });
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

            return resolve({
                status: 'OK',
                message: 'Cập nhật sản phẩm thành công',
                data: updatedProduct
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Xóa sản phẩm
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id });
            if (checkProduct === null) {
                return reject({
                    status: 'ERR',
                    message: 'Sản phẩm không tồn tại'
                });
            }
            await Product.findByIdAndDelete(id);

            return resolve({
                status: 'OK',
                message: 'Xóa sản phẩm thành công'
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Lấy tất cả sản phẩm với phân trang, sắp xếp và lọc
const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments();

            let query = {};

            // Xử lý lọc nếu có
            if (filter) {
                const [label, value] = filter;
                query[label] = { '$regex': value };
            }

            let productsQuery = Product.find(query).limit(limit).skip(page * limit);

            // Xử lý sắp xếp nếu có
            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                productsQuery = productsQuery.sort(objectSort);
            }

            const allProduct = await productsQuery;

            return resolve({
                status: 'OK',
                message: 'Thành công',
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
            if (product === null) {
                return reject({
                    status: 'ERR',
                    message: 'Sản phẩm không tồn tại'
                });
            }

            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: product
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailsProduct
};
