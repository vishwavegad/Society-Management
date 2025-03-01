const express = require('express');
const User = require('../models/user_model');
const { userLogIn } = require('../controllers/login_controller');

const router = express.Router();

router.post('/', userLogIn);

module.exports = router;