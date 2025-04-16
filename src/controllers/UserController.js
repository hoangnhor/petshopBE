
const UserServices = require('../services/UserServices');
const JwtService = require('../services/JwtService');

// API đăng ký người dùng
const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Dữ liệu đầu vào không đầy đủ'
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email không hợp lệ'
            });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Mật khẩu không khớp'
            });
        }

        const response = await UserServices.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi tạo người dùng.'
        });
    }
}

// API đăng nhập người dùng
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Dữ liệu đầu vào không đầy đủ'
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email không hợp lệ'
            });
        }

        const response = await UserServices.loginUser(req.body);
        const { refresh_token, ...newResponse } = response;
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: "strict",
            path: '/'
        });
        return res.status(200).json(newResponse);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi đăng nhập.'
        });
    }
}

// API cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ID người dùng là bắt buộc'
            });
        }

        const response = await UserServices.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi cập nhật người dùng.'
        });
    }
}

// API xóa người dùng
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ID người dùng là bắt buộc'
            });
        }

        const response = await UserServices.deleteUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi xóa người dùng.'
        });
    }
}

// API lấy tất cả người dùng
const getAllUser = async (req, res) => {
    try {
        const response = await UserServices.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi lấy danh sách người dùng.'
        });
    }
}

// API lấy chi tiết người dùng
const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ID người dùng là bắt buộc'
            });
        }

        const response = await UserServices.getDetailsUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi lấy chi tiết người dùng.'
        });
    }
}

// API làm mới token
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token;

        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Token làm mới là bắt buộc'
            });
        }

        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi làm mới token.'
        });
    }
}

// API đăng xuất người dùng
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'ok',
            message: 'Đăng xuất thành công'
        });
    } catch (e) {
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra khi đăng xuất.'
        });
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser

};
