const ProductService = require('../services/ProductService');

// API tạo sản phẩm
const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, description } = req.body;

        if (!name || !image || !type || !price || !countInStock) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Dữ liệu đầu vào không đầy đủ'
            });
        }

        console.log('Response:', req.body);

        const response = await ProductService.createProduct(req.body);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi tạo sản phẩm.'
        });
    }
}

// API cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;

        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ID sản phẩm là bắt buộc'
            });
        }

        const response = await ProductService.updateProduct(productId, data);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi cập nhật sản phẩm.'
        });
    }
}

// API lấy chi tiết sản phẩm
const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ID sản phẩm là bắt buộc'
            });
        }

        const response = await ProductService.getDetailsProduct(productId);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi lấy chi tiết sản phẩm.'
        });
    }
}

// API xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ID sản phẩm là bắt buộc'
            });
        }

        const response = await ProductService.deleteProduct(productId);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi xóa sản phẩm.'
        });
    }
}

// API lấy tất cả sản phẩm
const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;

        const response = await ProductService.getAllProduct(
            Number(limit) || 8,
            Number(page) || 0,
            sort
        );

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi lấy tất cả sản phẩm.'
        });
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}
