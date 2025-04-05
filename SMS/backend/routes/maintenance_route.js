const express = require("express");
const Maintenance = require("../models/maintenance_model");
const {
  getAllPayments,
  createNewPayment,
  getPaymentById,
  getPaymentByFlat,
  updatePaymentStatus,
} = require("../controllers/maintenance_controller");
const router = express.Router();

router.route("/").get(getAllPayments).post(createNewPayment);

router.route("/:id").get(getPaymentById).put(updatePaymentStatus);

router.route("/flat/:flatId").get(getPaymentByFlat);

module.exports = router;
