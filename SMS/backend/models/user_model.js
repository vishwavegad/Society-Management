const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    societyName: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,//URL of the profile picture
    },
    flatNum: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    contactNum: {
        type: Number,
        required: true,
    },
    payment: {
        type: Number,
        default: 0,
    },
    isOwner: {
        type: Boolean,
        default: true,
    }
},{timestamps: true});

export const User = mongoose.model('User', userSchema);