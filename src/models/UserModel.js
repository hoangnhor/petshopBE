const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { type: String, required: true, minlength: 6 },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: String }, // Thay Number thành String
        address: { type: String },
        avatar: { type: String }
    },
    {
        timestamps: true,
        indexes: [{ key: { email: 1 }, unique: true }] // Index cho email
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;