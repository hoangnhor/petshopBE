const UserServices = require('../services/UserServices');
const JwtService = require('../services/JwtServices');

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email);
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Đầu vào bắt buộc',
            });
        }
        if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email không hợp lệ',
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Mật khẩu không khớp',
            });
        }
        const response = await UserServices.createUser(req.body);
        return res.status(response.status === 'OK' ? 201 : 400).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email);
        if (!email || !password) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Đầu vào bắt buộc',
            });
        }
        if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email không hợp lệ',
            });
        }
        const response = await UserServices.loginUser(req.body);
        if (response.status === 'OK') {
            const { refresh_token, ...newResponse } = response;
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            });
            return res.status(200).json(newResponse);
        }
        return res.status(400).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'User ID bắt buộc',
            });
        }
        const response = await UserServices.updateUser(userId, data);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'User ID bắt buộc',
            });
        }
        const response = await UserServices.deleteUser(userId);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const response = await UserServices.getAllUser();
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'User ID bắt buộc',
            });
        }
        const response = await UserServices.getDetailsUser(userId);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) {
            return res.status(401).json({
                status: 'ERR',
                message: 'Token bắt buộc',
            });
        }
        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(response.status === 'OK' ? 200 : 401).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message,
        });
    }
};

// Đăng xuất người dùng
const logoutUser = (req, res) => {
    try {
        // Xóa refresh token trên client (điều này tùy thuộc vào nơi bạn lưu trữ refresh token, ví dụ trong cookie)
        res.clearCookie('refresh_token');  // nếu bạn lưu trữ refresh token trong cookie

        // Trả về phản hồi thành công
        return res.status(200).json({
            status: 'OK',
            message: 'Đăng xuất thành công',
        });
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi trong quá trình đăng xuất',
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
    logoutUser,
};