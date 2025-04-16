const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

// Tạo API đăng ký
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser;
        try {
            const checkUser = await User.findOne({ email });
            if (checkUser !== null) {
                throw new Error('email da ton tai');
            }
            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            });
            if (createdUser) {
                resolve({
                    data: createdUser
                });
            }
        } catch (e) {
            if (e.name === 'ValidationError') throw new Error(e.message);
            reject(e);
        }
    });
};

// Tạo API đăng nhập
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const checkUser = await User.findOne({ email });
            if (!checkUser) {
                throw new Error('nguoi dung khong ton tai');
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                throw new Error('mat khau hoac nguoi dung khong chinh xac');
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            });
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            });
            resolve({
                access_token,
                refresh_token
            });
        } catch (e) {
            if (e.name === 'CastError') throw new Error('Invalid email');
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
                throw new Error('nguoi dung khong ton tai');
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            resolve({
                data: updatedUser
            });
        } catch (e) {
            if (e.name === 'CastError') throw new Error('Invalid ID');
            reject(e);
        }
    });
};

// Xóa thông tin
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (!checkUser) {
                throw new Error('nguoi dung khong ton tai');
            }
            await User.findByIdAndDelete(id);
            resolve({
                message: 'xoa thanh cong'
            });
        } catch (e) {
            if (e.name === 'CastError') throw new Error('Invalid ID');
            reject(e);
        }
    });
};

// Lấy tất cả người dùng
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            resolve({
                data: allUser
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
                throw new Error('nguoi dung khong ton tai');
            }
            resolve({
                data: user
            });
        } catch (e) {
            if (e.name === 'CastError') throw new Error('Invalid ID');
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
    getDetailsUser
};