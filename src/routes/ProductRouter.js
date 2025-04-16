const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');
const validateObjectId = require('../middleware/validateObjectId');

// Tạo sản phẩm (yêu cầu đăng nhập)
router.post('/', authMiddleware, ProductController.createProduct);

// Cập nhật sản phẩm (yêu cầu đăng nhập)
router.put('/:id', validateObjectId, authMiddleware, ProductController.updateProduct);

// Lấy chi tiết sản phẩm
router.get('/:id', validateObjectId, ProductController.getDetailsProduct);

// Xóa sản phẩm (yêu cầu đăng nhập)
router.delete('/:id', validateObjectId, authMiddleware, ProductController.deleteProduct);

// Lấy danh sách sản phẩm (phân trang, lọc, sắp xếp)
router.get('/', ProductController.getAllProduct);

module.exports = router;
