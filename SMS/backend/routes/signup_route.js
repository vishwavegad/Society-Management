const express = require("express");
const User = require("../models/user_model");
const {userSignUp} = require("../controllers/signup_controller");

const router = express.Router();

router.post('/', userSignUp);

module.exports = router;