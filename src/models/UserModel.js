const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Để mã hóa mật khẩu
const validator = require('validator'); // Để kiểm tra email hợp lệ

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (v) => validator.isEmail(v), // Kiểm tra email hợp lệ
                message: props => `${props.value} không phải là email hợp lệ!`
            }
        },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: Number },
        address: { type: String },
        avatar: { type: String, default: 'default-avatar-url' }, // Avatar mặc định nếu không có
    },
    { timestamps: true }
);

// Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // Mã hóa mật khẩu trước khi lưu
    }
    next();
});

// Phương thức xác minh mật khẩu người dùng nhập vào
userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password); // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa
};

// Tạo mô hình người dùng từ schema
const User = mongoose.model('User', userSchema);

module.exports = User;
