const Complaints = require("../models/complaints_model");

async function createComplaint(req, res) {
  try {
    const { username, email, contactNo, complaint, flatNum, complaintType } = req.body;

    if (!username || !email || !contactNo || !complaint || !flatNum || !complaintType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComplaint = await Complaints.create({
      username,
      email,
      contactNo,
      complaint,
      flatNum,
      complaintType
    });

    res.status(201).json({ message: "Complaint created successfully", complaint: newComplaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllComplaints(req, res) {
  try {
    const complaints = await Complaints.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getComplaintById(req, res) {
  try {
    const complaint = await Complaints.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateComplaintStatus(req, res) {
  try {
    const { status } = req.body;
    const allowedStatuses = ["Pending", "In Progress", "Resolved"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedComplaint = await Complaints.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ message: "Status updated successfully", complaint: updatedComplaint });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteComplaint(req, res) {
  try {
    const complaint = await Complaints.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint
};
