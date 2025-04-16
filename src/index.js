
const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

// Cấu hình CORS (thay đổi origin thành URL của frontend trên Vercel)
app.use(cors({
    origin: 'https://petshop-fe.vercel.app/', // Thay bằng URL frontend của bạn
    credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

routes(app);

// Kết nối MongoDB
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
        console.log("Ket noi MONGODB thanh cong!");
    })
    .catch((err) => {
        console.error("Ket noi MONGODB that bai:", err);
    });

app.listen(port, () => {
    console.log("Server is running in port: " + port);
});

