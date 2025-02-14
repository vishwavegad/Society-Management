const mongoose = require('mongoose');

const announcementsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    }
}, { timestamps: true });

export const Announcements = mongoose.model('Announcements', announcementsSchema);