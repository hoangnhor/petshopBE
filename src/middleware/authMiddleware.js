const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware cho xác thực admin
const authMiddleware = async (req, res, next) => {
    const token = req.headers.token?.split(' ')[1]; // Lấy token từ header (Bearer <token>)

    if (!token) {
        return res.status(401).json({
            message: 'Token không tồn tại',
            status: 'error'
        });
    }

    try {
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN);

        if (user?.isAdmin) {
            return next(); // Chuyển sang middleware tiếp theo nếu là admin
        } else {
            return res.status(403).json({
                message: 'Không có quyền truy cập. Cần quyền admin.',
                status: 'error'
            });
        }
    } catch (err) {
        return res.status(401).json({
            message: 'Xác thực thất bại. Token không hợp lệ hoặc hết hạn.',
            status: 'error'
        });
    }
};

// Middleware cho xác thực người dùng cụ thể
const authUserMiddleware = async (req, res, next) => {
    const token = req.headers.token?.split(' ')[1]; // Lấy token từ header (Bearer <token>)
    const userId = req.params.id; // Lấy userId từ params

    if (!token) {
        return res.status(401).json({
            message: 'Token không tồn tại',
            status: 'error'
        });
    }

    try {
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN);

        // Kiểm tra quyền admin hoặc trùng khớp id người dùng
        if (user?.isAdmin || user?.id === userId) {
            return next(); // Chuyển sang middleware tiếp theo nếu đủ quyền
        } else {
            return res.status(403).json({
                message: 'Không đủ quyền truy cập. Bạn cần quyền admin hoặc quyền của chính người dùng.',
                status: 'error'
            });
        }
    } catch (err) {
        return res.status(401).json({
            message: 'Xác thực thất bại. Token không hợp lệ hoặc hết hạn.',
            status: 'error'
        });
    }
};

module.exports = {
    authMiddleware,
    authUserMiddleware
};
