const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require("./routes/index.js");
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();  // Load biến môi trường từ file .env

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Đăng ký các route API
routes(app);

// Kết nối đến MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Kết nối đến MongoDB thành công!');
    })
    .catch((err) => {
        console.error('Lỗi khi kết nối MongoDB:', err.message);
    });

// Khởi động server backend
app.listen(port, () => {
    console.log('Server đang chạy trên cổng:', port);
});
