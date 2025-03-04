const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user_model');

async function userLogIn(req, res){
    try {
        const {email, password, role} = req.body;
        const user = await User.findOne({ email});
        
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if(user.role != role){
            return res.status(403).json({msg: "Incorrect role selected"});
        }

        res.json({ 
            message: 'Login successful',
            role: user.role
        });
    }catch (err) {
        res.status(500).json({ message: 'Server error' , err: err.message});
    }
}

module.exports = {userLogIn};