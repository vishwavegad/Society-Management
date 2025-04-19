const mongoose = require("mongoose");

const AmenityBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    flat: {
      type: String,
      required: true,
    },
    amenity: {
      type: String,
      required: true,
    },
    functionName: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
    },
    duration: {
      type: Number,
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Booked", "Rejected"],
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AmenityBooking", AmenityBookingSchema);
