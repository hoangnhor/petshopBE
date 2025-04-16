const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware cho xác thực người dùng cụ thể (kiểm tra nếu người dùng là admin hoặc đúng id)
const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1]; // Lấy token từ header (Bearer <token>)
    const userId = req.params.id; // Lấy userId từ params

    if (!token) {
        return res.status(401).json({
            message: 'Token không tồn tại',
            status: 'error'
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: 'Xác thực thất bại. Token không hợp lệ hoặc hết hạn.',
                status: 'error'
            });
        }

        if (user?.isAdmin || user?.id === userId) {
            return next(); // Chuyển sang middleware tiếp theo nếu đủ quyền
        } else {
            return res.status(403).json({
                message: 'Không đủ quyền truy cập - Không phải người dùng này',
                status: 'error'
            });
        }
    });
};

module.exports = authUserMiddleware;