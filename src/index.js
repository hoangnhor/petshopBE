const express = require("express")
const dotenv = require('dotenv')
const { default: mongoose } = require("mongoose")
const routes = require("./routes")
const cors = require('cors')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express()
const port = process.env.PORT || 3030

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb' }))
app.use(bodyParser.json())
app.use(cookieParser())

// ✅ Route mặc định để kiểm tra server hoạt động
app.get('/', (req, res) => {
    res.send('🎉 PetShop Backend đang hoạt động!');
})

routes(app)

// Kết nối MongoDB
mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('ket noi MONGODB thanh cong!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('server is running in port:', port)
})
