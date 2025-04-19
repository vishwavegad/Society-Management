const express = require("express");
const {
  sendOtp,
  verifyOtp,
  resetPassword,
} = require("../controllers/forgotPassword_controller");

const router = express.Router();

router.post("/sendOtp", sendOtp);

router.post("/verifyOtp", verifyOtp);

router.post("/resetPassword", resetPassword);

module.exports = router;
