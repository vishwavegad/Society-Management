const express = require("express");
const Maintenance = require("../models/maintenance_model");
const {
  getAllPayments,
  createNewPayment,
  getPaymentById,
} = require("../controllers/maintenance_controller");
const router = express.Router();

router.route("/").get(getAllPayments).post(createNewPayment);

router.route("/:id").get(getPaymentById);

module.exports = router;
