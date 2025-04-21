const express = require('express');
const router = express.Router();
const TypeController = require('../controllers/TypeController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, TypeController.createType); // Chỉ admin
router.get('/getall', TypeController.getAllType); // Mọi người

module.exports = router;