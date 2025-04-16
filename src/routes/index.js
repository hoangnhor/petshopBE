const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const { authMiddleware } = require("../middleware/authMiddleware");

const routes = (app) => {
    app.use("/api/user", authMiddleware, UserRouter);
    app.use("/api/product", authMiddleware, ProductRouter);
};

module.exports = routes;