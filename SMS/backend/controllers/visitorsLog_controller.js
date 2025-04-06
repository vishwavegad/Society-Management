const visitorLog = require("../models/visitorsLog_model");

// Create a new visitor log
async function createVisitor(req, res) {
  try {
    const {
      visitorName,
      visitorContact,
      flatNum,
      visitorType,
      visitorEntryTime,
    } = req.body;

    if (
      !visitorName ||
      !visitorContact ||
      !flatNum ||
      !visitorType ||
      !visitorEntryTime
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newVisitor = await visitorLog.create({
      visitorName,
      visitorContact,
      flatNum,
      visitorType,
      visitorEntryTime,
    });

    res
      .status(201)
      .json({ message: "Visitor added successfully", visitor: newVisitor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all visitors
async function getAllVisitors(req, res) {
  try {
    const visitors = await visitorLog.find().sort({ createdAt: -1 });
    res.status(200).json(visitors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get visitor by ID
async function getVisitorById(req, res) {
  try {
    const visitor = await visitorLog.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.status(200).json(visitor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update visitor exit time and status
async function markVisitorExit(req, res) {
  try {
    const visitor = await visitorLog.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    visitor.visitorExitTime = new Date();
    visitor.visitorExitStatus = "Exited";
    await visitor.save();

    res.status(200).json({ message: "Visitor marked as exited", visitor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete visitor record
async function deleteVisitor(req, res) {
  try {
    const visitor = await visitorLog.findByIdAndDelete(req.params.id);
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }
    res.status(200).json({ message: "Visitor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  markVisitorExit,
  deleteVisitor,
};
