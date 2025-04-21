const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const TypeRouter = require('./TypeRouter')
const BillRouter = require('./BillRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/type', TypeRouter)
    app.use('/api/bill', BillRouter)
}
module.exports = routes