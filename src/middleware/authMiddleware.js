const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided', status: 'error' });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        if (decoded?.isAdmin) {
            next();
        } else {
            return res.status(401).json({
                message: 'Xác thực thất bại',
                status: 'error'
            });
        }
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token', status: 'error' });
    }
};

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1];
    const userId = req.params.id;
    if (!token) return res.status(401).json({ message: 'No token provided', status: 'error' });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        if (decoded?.isAdmin || decoded?.id === userId) {
            next();
        } else {
            return res.status(401).json({
                message: 'Xác thực thất bại',
                status: 'error'
            });
        }
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token', status: 'error' });
    }
};

module.exports = {
    authMiddleware,
    authUserMiddleware
};