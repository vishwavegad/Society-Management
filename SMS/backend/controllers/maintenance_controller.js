const Maintenance = require("../models/maintenance_model");

async function getAllPayments(req, res) {
  try {
    const payments = await Maintenance.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createNewPayment(req, res) {
  try {
    const { name, email, amount, paymentMethod, pin, flatNum } = req.body;
    const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const newPayment = new Maintenance({
      name,
      email,
      amount,
      paymentMethod,
      pin,
      flatNum,
      transactionId,
      paymentStatus: "pending",
    });
    await newPayment.save();
    res
      .status(201)
      .json({
        success: true,
        msg: "Payment initiated successfully",
        newPayment,
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function getPaymentById(req, res) {
  try {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
      res.status(404).json({ error: "Maintenance not paid" });
    }
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAllPayments, createNewPayment, getPaymentById };
