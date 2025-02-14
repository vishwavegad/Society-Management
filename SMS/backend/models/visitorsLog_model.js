const mongoose = require('mongoose');

const visitorLogSchema = new mongoose.Schema({
    visitorName: {
        type: String,
        required: true,
    },
    visitorContact: {
        type: Number,
        required: true,
    },
    flatNum: {
        type: Number,
        required: true,
    },
    visitorType: {
        type: String,
        required: true,
        enum: ["Delivery", "Guest", "Service Provider"],
    },
    visitorVehicleNum: {
        type: String,
        required: true,
    },
    visitorEntryTime: {
        type: Date,
        default: Date.now,
    },
    visitorExitTime: {
        type: Date,
    },
    visitorExitStatus: {
        type: String,
        enum: ["Exited", "Not Exited"],
        default: "Not Exited",
    }
}, { timestamps: true });

export const VisitorLog = mongoose.model('VisitorLog', visitorLogSchema);