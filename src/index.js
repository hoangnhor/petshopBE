const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require("./routes/index.js");
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Tải biến môi trường từ file .env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;  // Cung cấp cổng mặc định nếu không có trong biến môi trường

// Cấu hình CORS
const corsOptions = {
    origin: process.env.CLIENT_URL || 'https://petshop-fe.vercel.app', // URL frontend được phép gọi API
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));  // Sử dụng CORS với các option đã cấu hình

// Middleware để xử lý body request (JSON và URL-encoded)
app.use(express.json({ limit: '50mb' }));  // Cho phép tải lên các file lớn nếu cần
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());  // Để xử lý cookies trong các yêu cầu

// Đăng ký các route API
routes(app);

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Kết nối đến MongoDB thành công!');
    })
    .catch((err) => {
        console.error('Lỗi khi kết nối MongoDB:', err.message);
    });

// Middleware xử lý lỗi toàn cục
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Khởi động server backend
app.listen(port, () => {
    console.log(`Server đang chạy trên cổng: ${port}`);
});

// Xử lý các lỗi bất ngờ (uncaught exception và unhandled rejection)
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Dừng ứng dụng khi có lỗi nghiêm trọng
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1); // Dừng ứng dụng khi có lỗi nghiêm trọng
});
