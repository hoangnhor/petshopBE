const UserServices = require('../services/UserServices');
const JwtService = require('../services/JwtService');

// API đăng ký
const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email);
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'dau vao bat buoc'
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email không hợp lệ'
            });
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Mật khẩu không khớp'
            });
        }
        const response = await UserServices.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(e.name === 'ValidationError' ? 400 : 500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

// API đăng nhập
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email);
        if (!email || !password) {
            return res.status(400).json({
                status: 'ERR',
                message: 'dau vao bat buoc'
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email không hợp lệ'
            });
        }
        const response = await UserServices.loginUser(req.body);
        const { refresh_token, ...newResponse } = response;
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true, // Thay false thành true cho HTTPS trên Render
            sameSite: 'strict',
            path: '/'
        });
        return res.status(200).json(newResponse);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

// Cập nhật thông tin
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'userid bat buoc'
            });
        }
        const response = await UserServices.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(e.name === 'CastError' ? 404 : 500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

// Xóa thông tin
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'userid bat buoc'
            });
        }
        const response = await UserServices.deleteUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(e.name === 'CastError' ? 404 : 500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

// Lấy tất cả người dùng
const getAllUser = async (req, res) => {
    try {
        const response = await UserServices.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

// Lấy chi tiết người dùng
const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'userid bat buoc'
            });
        }
        const response = await UserServices.getDetailsUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(e.name === 'CastError' ? 404 : 500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

// Làm mới token
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) {
            return res.status(400).json({
                status: 'ERR',
                message: 'the token bat buoc'
            });
        }
        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

// Đăng xuất
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'OK',
            message: 'dang xuat thanh cong'
        });
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Server error'
        });
    }
};

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