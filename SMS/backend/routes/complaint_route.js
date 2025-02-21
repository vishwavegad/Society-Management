const express = require("express");
const Complaint = require('../models/complaints_model');
const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint
} = require("../controllers/complaint_controller");

const router = express.Router();

router.route('/')
    .get(getAllComplaints)
    .post(createComplaint);

router.route('/:id')
    .get(getComplaintById)
    .delete(deleteComplaint);

router.route('/:id/status')
   .put(updateComplaintStatus);

module.exports = router;