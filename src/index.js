const express = require("express");
const dotenv = require('dotenv');
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Load biến môi trường từ file .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

routes(app);

// Kiểm tra và kết nối MongoDB
if (!process.env.MONGODB_URL) {
    console.error('Lỗi: MONGODB_URL không được định nghĩa trong file .env');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Ket noi MONGODB thanh cong!'))
    .catch(err => {
        console.error('Lỗi kết nối MongoDB:', err);
        process.exit(1);
    });

app.listen(port, () => {
    console.log('Server is running on port:', port);
});