const BillService = require('../services/BillServices');

const createBill = async (req, res) => {
    try {
        const userId = req.userId;
        const response = await BillService.createBill(req.body, userId);
        return res.status(response.status === 'OK' ? 201 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: error.message,
        });
    }
};

const getAllBill = async (req, res) => {
    try {
        const userId = req.userId;
        const isAdmin = req.isAdmin;
        const response = await BillService.getAllBill(userId, isAdmin);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: error.message,
        });
    }
};

const getDetailsBill = async (req, res) => {
    try {
        const billId = req.params.id;
        const userId = req.userId;
        const isAdmin = req.isAdmin;
        if (!billId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Bill ID bắt buộc',
            });
        }
        const response = await BillService.getDetailsBill(billId, userId, isAdmin);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: error.message,
        });
    }
};

const deleteBill = async (req, res) => {
    try {
        const billId = req.params.id;
        if (!billId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Bill ID bắt buộc',
            });
        }
        const response = await BillService.deleteBill(billId);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: error.message,
        });
    }
};

module.exports = {
    createBill,
    getAllBill,
    getDetailsBill,
    deleteBill,
};