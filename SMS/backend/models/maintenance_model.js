const mongoose = require('mongoose');

const maintainanceSchema = new mongoose.Schema({
    name: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        // ref: "User",
        required: true,
        trim: true
    },
    email: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        // ref: "User",
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    amount: {
            type: Number,
            min: 1,
            required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["Credit Card", "Debit Card", "Bank Tansfer", "PayPal"],
    },
    pin: {
        type: String,
        required: true,
    },
    flatNum: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
        required: true, 
        unique: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Maintainance', maintainanceSchema);