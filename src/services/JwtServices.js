const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign(
        { ...payload },
        process.env.ACCESS_TOKEN,
        { expiresIn: '15m' }
    );
    return access_token;
};

const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign(
        { ...payload },
        process.env.REFRESH_TOKEN,
        { expiresIn: '365d' }
    );
    return refresh_token;
};

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
            if (err || !user) {
                return resolve({
                    status: 'ERR',
                    message: 'Xác thực thất bại',
                });
            }
            const access_token = await genneralAccessToken({
                id: user.id,
                email: user.email, // Thêm email để đầy đủ thông tin
                isAdmin: user.isAdmin,
            });
            return resolve({
                status: 'OK',
                message: 'Thành công',
                access_token,
            });
        });
    });
};

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService,
};