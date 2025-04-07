const mongoose = require("mongoose");

const visitorLogSchema = new mongoose.Schema(
  {
    visitorName: {
      type: String,
      required: true,
    },
    visitorContact: {
      type: Number,
      required: true,
    },
    flatNum: {
      type: String,
      required: true,
    },
    visitorType: {
      type: String,
      required: true,
      enum: ["Delivery", "Guest", "Service Provider"],
    },
    // visitorVehicleNum: {
    //     type: String,
    //     required: true,
    // },
    visitorEntryTime: {
      type: Date,
      default: Date.now,
    },
    visitorExitTime: {
      type: Date,
    },
    visitorExitStatus: {
      type: String,
      enum: ["Exited", "Not Exited"],
      default: "Not Exited",
    },
  },
  { timestamps: true }
);

const visitorsLog = mongoose.model("visitorsLog", visitorLogSchema);

module.exports = visitorsLog;
