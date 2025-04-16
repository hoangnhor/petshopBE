const ProductService = require('../services/ProductService');

// API sản phẩm
const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, description } = req.body;
        if (!name || !image || !type || !price || !countInStock) {
            return res.status(400).json({
                status: 'ERR',
                message: 'dau vao bat buoc'
            });
        }
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(e.name === 'ValidationError' ? 400 : 500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'id sản phấm bat buoc'
            });
        }
        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(e.name === 'CastError' ? 404 : 500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

// Lấy chi tiết sản phẩm
const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'id san pham bat buoc'
            });
        }
        const response = await ProductService.getDetailsProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(e.name === 'CastError' ? 404 : 500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'id san pham bat buoc'
            });
        }
        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(e.name === 'CastError' ? 404 : 500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

// Lấy tất cả sản phẩm
const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
};