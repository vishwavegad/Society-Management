const mongoose = require('mongoose');

const complaintsSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // type: String,
        required: true,
        trim: true,
    },
    email: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        // type: String,
        required: true,
        trim: true,
        // unique: true,
        lowercase: true,
    },
    flatNum: {
        type: Number,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    complaintType: {
        type: String,
        required: true,
        enum: ["Maintenance", "Security", "Cleanliness","Noise Complaint","Parking", "Other"],
    },
    complaint: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved"],
        default: "Pending",
    }
}, { timestamps: true });

const Complaints = mongoose.model('Complaints', complaintsSchema);

module.exports = Complaints;