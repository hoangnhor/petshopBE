const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');

// Kiểm tra tham số ID
router.param('id', (req, res, next, id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    next();
});

router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
router.post('/log-out', UserController.logoutUser);
router.put('/update-user/:id', authUserMiddleware, UserController.updateUser);
router.delete('/delete-user/:id', authMiddleware, UserController.deleteUser);
router.get('/getAll', authMiddleware, UserController.getAllUser);
router.get('/get-details/:id', authUserMiddleware, UserController.getDetailsUser);
router.post('/refresh-token', UserController.refreshToken);

module.exports = router;