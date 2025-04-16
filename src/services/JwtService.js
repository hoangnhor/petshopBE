const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Tạo access token
const genneralAccessToken = async (payload) => {
    try {
        const access_token = jwt.sign(
            { ...payload },
            process.env.ACCESS_TOKEN,
            { expiresIn: '15m' }
        );
        return access_token;
    } catch (e) {
        throw new Error("Lỗi khi tạo Access Token: " + e.message);
    }
};

// Tạo refresh token
const genneralRefreshToken = async (payload) => {
    try {
        const refresh_token = jwt.sign(
            { ...payload },
            process.env.REFRESH_TOKEN,
            { expiresIn: '365d' }
        );
        return refresh_token;
    } catch (e) {
        throw new Error("Lỗi khi tạo Refresh Token: " + e.message);
    }
};

// Làm mới Access Token bằng Refresh Token
const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    return reject({
                        status: 'ERR',
                        message: 'Lỗi xác thực Refresh Token: ' + err.message
                    });
                }

                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                });

                return resolve({
                    status: 'OK',
                    message: 'Làm mới Access Token thành công',
                    access_token
                });
            });
        } catch (e) {
            reject({
                status: 'ERR',
                message: 'Lỗi khi làm mới Access Token: ' + e.message
            });
        }
    });
};

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
};
