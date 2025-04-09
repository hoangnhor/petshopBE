const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes'); // Nếu bạn gọi routes như ở trên

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Route cho trang chính (tránh lỗi 404 khi vào /)
app.get('/', (req, res) => {
    res.send('🎉 PetShop Backend đang hoạt động!');
});

// ✅ Gọi routes riêng
routes(app);

// Kết nối MongoDB và chạy server
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Kết nối MONGODB thành công !');
        app.listen(PORT, () => {
            console.log(`máy chủ đang chạy ở cổng: ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Lỗi kết nối MongoDB:', err);
    });
