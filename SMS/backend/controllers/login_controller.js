const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user_model');

async function userLogIn(req, res){
    try {
        const {email, password, role} = req.body;
        const user = await User.findOne({ email});
        console.log("Login Attempt ->", { email, password, role });
        
        if (!user) {
            console.log("User not found in DB");

            return res.status(400).json({ msg: 'User not found' });
        }
        console.log("Found user:", user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password does not match");
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        if(user.role != role){
            console.log(`Role mismatch: expected ${user.role}, got ${role}`);
            return res.status(403).json({msg: "Incorrect role selected"});
        }

        console.log("Login successful");
        res.json({ 
            message: 'Login successful',
            role: user.role.toLowerCase()
        });
    }catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ msg: 'Server error' , err: err.msg});
    }
}

module.exports = {userLogIn};