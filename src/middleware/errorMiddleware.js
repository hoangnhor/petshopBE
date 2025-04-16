const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Xử lý lỗi cụ thể
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    } else if (err.name === 'CastError') {
        statusCode = 404;
        message = 'Resource not found';
    } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Invalid or expired token';
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};

module.exports = { errorHandler };