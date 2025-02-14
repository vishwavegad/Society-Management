const mongoose = require('mongoose');

const maintainanceSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    flatNum: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["Credit Card", "Debit Card", "Bank Tansfer", "PayPal"],
    }
}, { timestamps: true });

export const Maintainance = mongoose.model('Maintainance', maintainanceSchema);