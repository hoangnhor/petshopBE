const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); // Sửa typo
dotenv.config();

const generalAccessToken = (payload) => { // Loại async vì không cần
    if (!payload.id || payload.isAdmin === undefined) {
        throw new Error('Invalid payload');
    }
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '15m' });
    return access_token;
};

const generalRefreshToken = (payload) => { // Loại async vì không cần
    if (!payload.id || payload.isAdmin === undefined) {
        throw new Error('Invalid payload');
    }
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
    return refresh_token;
};

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) {
                    throw new Error('Token verification failed');
                }
                const access_token = generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                });
                resolve({
                    access_token
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService
};