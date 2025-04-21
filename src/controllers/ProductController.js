const ProductService = require('../services/ProductServices');

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock } = req.body;
        if (!name || !type || !price || !countInStock) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Đầu vào bắt buộc: name, type, price, countInStock',
            });
        }
        const response = await ProductService.createProduct(req.body);
        return res.status(response.status === 'OK' ? 201 : 400).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Product ID bắt buộc',
            });
        }
        const response = await ProductService.updateProduct(productId, data);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message,
        });
    }
};

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Product ID bắt buộc',
            });
        }
        const response = await ProductService.getDetailsProduct(productId);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Product ID bắt buộc',
            });
        }
        const response = await ProductService.deleteProduct(productId);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message,
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        const response = await ProductService.getAllProduct(limit, page, sort, filter);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message,
        });
    }
};

const searchProduct = async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Keyword là bắt buộc',
            });
        }
        const response = await ProductService.searchProduct(keyword);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message,
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    searchProduct,
};