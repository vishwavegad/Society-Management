const User = require('../models/user');

async function getAllUsers(req, res) {
    const allUsers = await User.find();
    return res.json(allUsers);
}

async function createNewUser(req, res) {
    const body = req.body;
    if (!body || !body.name || !body.email){
        return res.status(400).json({ message: 'All fields are required' });
    }
    const result = await User.create({
        name: body.name,
        email: body.email,
    })
    res.status(201).json({msg: 'Success'});
}

module.exports = {
    getAllUsers,
    createNewUser,
}