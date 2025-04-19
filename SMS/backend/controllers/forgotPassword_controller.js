const nodemailer = require("nodemailer");
const User = require("../models/user_model");
const bcrypt = require("bcrypt");

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

async function sendOtp(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not registered" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: "Your App Name <no-reply@yourapp.com>",
      to: email,
      subject: "OTP for Password Reset",
      text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
      html: `<p>Your OTP is: <strong>${otp}</strong></p><p>This will expire in 10 minutes.</p>`,
    });

    console.log(`OTP sent to ${email}: ${otp}`);
    console.log(`Preview link: ${nodemailer.getTestMessageUrl(info)}`);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("sendOtp error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("verifyOtp error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function resetPassword(req, res) {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Password has been updated" });
  } catch (err) {
    console.error("resetPassword error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  sendOtp,
  verifyOtp,
  resetPassword,
};
