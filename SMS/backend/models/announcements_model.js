const mongoose = require('mongoose');

const announcementsSchema = new mongoose.Schema({
    subject:{
        type: String,
        required: true,
        trim: true
    },
    message:{
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Announcements', announcementsSchema);