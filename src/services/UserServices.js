const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtServices");

// Tạo API đăng ký
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone, isAdmin } = newUser; // Thêm isAdmin từ dữ liệu đầu vào
        try {
            if (!name || !email || !password) {
                return resolve({
                    status: 'ERR',
                    message: 'Thiếu thông tin bắt buộc: name, email, password',
                });
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return resolve({
                    status: 'ERR',
                    message: 'Email không hợp lệ',
                });
            }
            const checkUser = await User.findOne({ email });
            if (checkUser !== null) {
                return resolve({
                    status: 'ERR',
                    message: 'Email đã tồn tại',
                });
            }
            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone,
                isAdmin: isAdmin || false, // Nếu không truyền isAdmin, mặc định là false
            });
            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: createdUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Tạo API đăng nhập
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            if (!email || !password) {
                return resolve({
                    status: 'ERR',
                    message: 'Email và password là bắt buộc',
                });
            }
            const checkUser = await User.findOne({ email });
            if (!checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại',
                });
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                return resolve({
                    status: 'ERR',
                    message: 'Mật khẩu không chính xác',
                });
            }
            const access_token = await genneralAccessToken({
                id: checkUser._id,
                email: checkUser.email,
                isAdmin: checkUser.isAdmin, // Thêm isAdmin vào token
            });
            const refresh_token = await genneralRefreshToken({
                id: checkUser._id,
                email: checkUser.email,
                isAdmin: checkUser.isAdmin,
            });
            return resolve({
                status: 'OK',
                message: 'Thành công',
                access_token,
                refresh_token,
                isAdmin: checkUser.isAdmin, // Trả về isAdmin để frontend xử lý điều hướng
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Tạo API cập nhật
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (!checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại',
                });
            }
            if (data.email) {
                const emailCheck = await User.findOne({ email: data.email, _id: { $ne: id } });
                if (emailCheck) {
                    return resolve({
                        status: 'ERR',
                        message: 'Email đã tồn tại',
                    });
                }
            }
            if (data.password) {
                data.password = bcrypt.hashSync(data.password, 10);
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: updatedUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Xóa thông tin người dùng
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (!checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại',
                });
            }
            await User.findByIdAndDelete(id);
            return resolve({
                status: 'OK',
                message: 'Xóa thành công',
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Lấy tất cả người dùng
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: allUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

// Lấy chi tiết người dùng
const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ _id: id });
            if (!user) {
                return resolve({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại',
                });
            }
            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: user,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
};