const express = require("express");
const AmenityBooking = require("../models/amenitiesform_model");
const {
  getAllBookings,
  createNewBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/amenitiesform_controller");

const router = express.Router();

router.route("/").get(getAllBookings).post(createNewBooking);

router
  .route("/:id")
  .get(getBookingById)
  .put(updateBooking)
  .delete(deleteBooking);

module.exports = router;
