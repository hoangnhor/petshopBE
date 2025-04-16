const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');
const validateObjectId = require('../middleware/validateObjectId');

// Đăng ký người dùng
router.post('/sign-up', UserController.createUser);

// Đăng nhập người dùng
router.post('/sign-in', UserController.loginUser);

// Đăng xuất người dùng
router.post('/log-out', UserController.logoutUser);

// Cập nhật thông tin người dùng (chỉ dành cho người dùng cụ thể hoặc admin)
router.put('/update-user/:id', validateObjectId, authUserMiddleware, UserController.updateUser);

// Xóa thông tin người dùng (chỉ dành cho admin)
router.delete('/delete-user/:id', validateObjectId, authMiddleware, UserController.deleteUser);

// Lấy danh sách tất cả người dùng (chỉ dành cho admin)
router.get('/getAll', authMiddleware, UserController.getAllUser);

// Lấy thông tin chi tiết người dùng (chỉ dành cho người dùng cụ thể hoặc admin)
router.get('/get-details/:id', validateObjectId, authUserMiddleware, UserController.getDetailsUser);

// Lấy refresh token (không yêu cầu xác thực người dùng)
router.post('/refresh-token', UserController.refreshToken);

module.exports = router;
