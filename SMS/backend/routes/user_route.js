const express = require('express');
const User = require('../models/user_model');
const router = express.Router();
const {getAllUsers, createNewUser} = require('../controllers/user_controller');

router.route('/')
    .get(getAllUsers)
    .post(createNewUser);

module.exports = router;