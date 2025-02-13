const mongoose = require('mongoose');

const complaintsSchema = new mongoose.Schema({
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
    complaint: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Resolved"],
        default: "Pending",
    },
    flatNum: {
        type: Number,
        required: true,
    },
    complaintType: {
        type: String,
        required: true,
        enum: ["Maintenance", "Security", "Cleanliness","Noise Complaint","Parking", "Other"],
    }
}, { timestamps: true });

export const Complaints = mongoose.model('Complaints', complaintsSchema);