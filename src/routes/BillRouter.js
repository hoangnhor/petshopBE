const express = require('express');
const router = express.Router();
const BillController = require('../controllers/BillController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

router.post('/create', authUserMiddleware, BillController.createBill); // Người dùng tạo hóa đơn
router.get('/getall', authUserMiddleware, BillController.getAllBill); // Admin hoặc người dùng 
router.get('/get-details/:id', authUserMiddleware, BillController.getDetailsBill); // Admin hoặc người dùng
router.delete('/delete/:id', authMiddleware, BillController.deleteBill); // Chỉ admin

module.exports = router;