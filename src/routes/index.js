const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')

<<<<<<< HEAD
const routes=(app)=>{
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
}
module.exports=routes
=======
const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
}
module.exports = routes
>>>>>>> 0594244 (first commit)
