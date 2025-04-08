const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
    role: {
        type: String,
        enum: ["member", "admin", "security"],
        default: "member"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
            return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userSchema);