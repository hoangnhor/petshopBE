const Bill = require('../models/BillModel');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');

const createBill = (newBill, userId) => {
    return new Promise(async (resolve, reject) => {
        const { items } = newBill;
        try {
            // Kiểm tra user tồn tại
            const checkUser = await User.findById(userId);
            if (!checkUser) {
                return resolve({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại',
                });
            }

            // Kiểm tra sản phẩm và tính tổng tiền
            let tongtien = 0;
            for (const item of items) {
                const product = await Product.findById(item.idsp);
                if (!product) {
                    return resolve({
                        status: 'ERR',
                        message: `Sản phẩm ${item.idsp} không tồn tại`,
                    });
                }
                if (product.countInStock < item.quantity) {
                    return resolve({
                        status: 'ERR',
                        message: `Sản phẩm ${product.name} không đủ hàng (còn: ${product.countInStock})`,
                    });
                }
                const priceAfterDiscount = product.price * (1 - (product.discount || 0) / 100);
                tongtien += priceAfterDiscount * item.quantity;

                // Cập nhật số lượng tồn kho và số lượng đã bán
                product.countInStock -= item.quantity;
                product.selled = (product.selled || 0) + item.quantity;
                await product.save();
            }

            // Tạo hóa đơn
            const createdBill = await Bill.create({
                iduser: userId,
                items,
                tongtien,
            });

            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: createdBill,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllBill = (userId, isAdmin) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = Bill.find().populate('iduser').populate('items.idsp');
            if (!isAdmin) {
                query = query.find({ iduser: userId });
            }
            const allBills = await query;
            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: allBills,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailsBill = (billId, userId, isAdmin) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bill = await Bill.findById(billId).populate('iduser').populate('items.idsp');
            if (!bill) {
                return resolve({
                    status: 'ERR',
                    message: 'Hóa đơn không tồn tại',
                });
            }
            if (!isAdmin && bill.iduser.toString() !== userId) {
                return resolve({
                    status: 'ERR',
                    message: 'Bạn không có quyền xem hóa đơn này',
                });
            }
            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: bill,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteBill = (billId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bill = await Bill.findById(billId);
            if (!bill) {
                return resolve({
                    status: 'ERR',
                    message: 'Hóa đơn không tồn tại',
                });
            }
            // Hoàn lại số lượng tồn kho và giảm selled
            for (const item of bill.items) {
                const product = await Product.findById(item.idsp);
                if (product) {
                    product.countInStock += item.quantity;
                    product.selled -= item.quantity;
                    await product.save();
                }
            }
            await Bill.findByIdAndDelete(billId);
            return resolve({
                status: 'OK',
                message: 'Xóa thành công',
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createBill,
    getAllBill,
    getDetailsBill,
    deleteBill,
};