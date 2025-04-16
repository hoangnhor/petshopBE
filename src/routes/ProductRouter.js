const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Kiểm tra tham số ID
router.param('id', (req, res, next, id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    next();
});

router.post('/create', ProductController.createProduct);
router.put('/update/:id', authMiddleware, ProductController.updateProduct);
router.get('/get-details/:id', ProductController.getDetailsProduct);
router.delete('/delete/:id', ProductController.deleteProduct);
router.get('/get-all', ProductController.getAllProduct);

module.exports = router;