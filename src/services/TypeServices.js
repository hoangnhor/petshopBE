const Type = require("../models/TypeModel");

const createType = (newType) => {
    return new Promise(async (resolve, reject) => {
        const { name } = newType;
        try {
            if (!name) {
                return resolve({
                    status: 'ERR',
                    message: 'Tên loại sản phẩm là bắt buộc',
                });
            }
            const checkType = await Type.findOne({ name });
            if (checkType !== null) {
                return resolve({
                    status: 'ERR',
                    message: 'Tên loại sản phẩm đã tồn tại',
                });
            }
            const createdType = await Type.create({ name });
            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: createdType,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Type.find();
            return resolve({
                status: 'OK',
                message: 'Thành công',
                data: allType,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createType,
    getAllType,
};