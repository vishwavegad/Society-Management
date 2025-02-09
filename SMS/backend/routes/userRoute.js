const express = require('express');
const User = require('../models/user');
const router = express.Router();
const {getAllUsers, createNewUser} = require('../controllers/userController');

router.route('/')
.get(getAllUsers)
.post(createNewUser);

module.exports = router;