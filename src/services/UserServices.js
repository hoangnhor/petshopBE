const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

// Tạo API đăng ký
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser;
        try {
            const checkUser = await User.findOne({ email: email });
            if (checkUser !== null) {
                return reject({
                    status: 'ERR',
                    message: 'Email đã tồn tại'
                });
            }
            const hash = bcrypt.hashSync(password, 10);

            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            });

            if (createdUser) {
                return resolve({
                    status: 'OK',
                    message: 'Đăng ký thành công',
                    data: createdUser
                });
            }
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
            const checkUser = await User.findOne({ email: email });
            if (!checkUser) {
                return reject({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại'
                });
            }
            const comparePassword = await bcrypt.compare(password, checkUser.password);

            if (!comparePassword) {
                return reject({
                    status: 'ERR',
                    message: 'Mật khẩu hoặc người dùng không chính xác'
                });
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
                status: 'OK',
                message: 'Đăng nhập thành công',
                access_token,
                refresh_token
            });

        } catch (e) {
            reject(e);
        }
    });
};

// Tạo API cập nhật người dùng
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (checkUser === null) {
                return reject({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại'
                });
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

            return resolve({
                status: 'OK',
                message: 'Cập nhật thành công',
                data: updatedUser
            });

        } catch (e) {
            reject(e);
        }
    });
};

// Tạo API xóa người dùng
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (checkUser === null) {
                return reject({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại'
                });
            }
            await User.findByIdAndDelete(id);

            return resolve({
                status: 'OK',
                message: 'Xóa thành công'
            });

        } catch (e) {
            reject(e);
        }
    });
};

// API lấy tất cả người dùng
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: allUser
            });

        } catch (e) {
            reject(e);
        }
    });
};

// API lấy chi tiết người dùng
const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ _id: id });

            if (user === null) {
                return reject({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại'
                });
            }

            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: user
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

    getDetailsUser
};

