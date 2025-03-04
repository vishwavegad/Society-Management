const express = require("express");
const User = require("../models/user_model");

async function userSignUp(req, res){
    try{
        const {username, email, password, societyName, role} = req.body;

        const existingUser = await User.findOne({
            $or: [{email: req.body.email}, {username: req.body.username}]
        });
        if(existingUser){
            return res.status(400).json({msg: "User already exists"});
        }

        const newUser = new User({username, email, password, societyName, role});
        await newUser.save();
        res.status(201).json({msg: "User registered successfully"});
    } catch(error){
        res.status(500).json({msg: "Server error", error});
    }
}

module.exports = {userSignUp};