const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.use(cors({
    origin: ['https://petshop-fe.vercel.app', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

routes(app);

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
    })
    .then(() => console.log('Ket noi MONGODB thanh cong!'))
    .catch((err) => console.error('Ket noi MONGODB that bai:', err));

app.listen(port, '0.0.0.0', () => {
    console.log("Server is running in port: " + port);
});

app.use(errorHandler); // Thêm middleware xử lý lỗi