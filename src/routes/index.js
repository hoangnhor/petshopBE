const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');

const routes = (app) => {
    app.use('/api/users', UserRouter);  // Định tuyến người dùng
    app.use('/api/products', ProductRouter);  // Định tuyến sản phẩm
};

module.exports = routes;
