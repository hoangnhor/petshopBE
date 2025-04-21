const TypeService = require('../services/TypeServices');

const createType = async (req, res) => {
    try {
        const response = await TypeService.createType(req.body);
        return res.status(response.status === 'OK' ? 201 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: error.message,
        });
    }
};

const getAllType = async (req, res) => {
    try {
        const response = await TypeService.getAllType();
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: error.message,
        });
    }
};

module.exports = {
    createType,
    getAllType,
};