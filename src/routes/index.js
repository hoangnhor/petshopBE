const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const authMiddleware = require('../middleware/authMiddleware');

const routes = (app) => {
    app.use('/api/user', authMiddleware, UserRouter); // Thêm middleware xác thực
    app.use('/api/product', authMiddleware, ProductRouter); // Thêm middleware xác thực
};

module.exports = routes;