const mongoose = require('mongoose');

const billSchema = new mongoose.Schema(
    {
        iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                idsp: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true, min: 1 },
            },
        ],
        tongtien: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;