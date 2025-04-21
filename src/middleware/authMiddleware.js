const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: 'ERR',
            message: 'Token không được cung cấp',
        });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(401).json({
                status: 'ERR',
                message: 'Xác thực thất bại',
            });
        }
        if (user?.isAdmin) {
            req.user = user;
            next();
        } else {
            return res.status(403).json({
                status: 'ERR',
                message: 'Chỉ admin mới có quyền truy cập',
            });
        }
    });
};

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const userId = req.params.id;
    if (!token) {
        return res.status(401).json({
            status: 'ERR',
            message: 'Token không được cung cấp',
        });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(401).json({
                status: 'ERR',
                message: 'Xác thực thất bại',
            });
        }
        if (user?.isAdmin || user?.id === userId) {
            req.user = user;
            next();
        } else {
            return res.status(403).json({
                status: 'ERR',
                message: 'Xác thực thất bại',
            });
        }
    });
};

module.exports = {
    authMiddleware,
    authUserMiddleware,
};