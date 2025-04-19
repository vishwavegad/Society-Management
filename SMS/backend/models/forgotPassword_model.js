const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    otp: {
      type: String,
      required: true,
    },
    otpExpiry: {
      type: Date,
      required: true,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema);

module.exports = ForgotPassword;
