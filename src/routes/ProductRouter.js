const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, ProductController.createProduct); // Chỉ admin
router.put('/update/:id', authMiddleware, ProductController.updateProduct); // Chỉ admin
router.delete('/delete/:id', authMiddleware, ProductController.deleteProduct); // Chỉ admin
router.get('/getall', ProductController.getAllProduct); // Mọi người
router.get('/get-details/:id', ProductController.getDetailsProduct); // Mọi người

module.exports = router;