const express = require("express");
const {
  createVisitor,
  getAllVisitors,
  getVisitorById,
  markVisitorExit,
  deleteVisitor,
} = require("../controllers/visitorsLog_controller");

const router = express.Router();

// GET all visitors, POST new visitor
router.route("/").get(getAllVisitors).post(createVisitor);

// GET a visitor by ID, DELETE a visitor
router.route("/:id").get(getVisitorById).delete(deleteVisitor);

// PATCH to mark a visitor as exited
router.route("/:id/exit").patch(markVisitorExit);

module.exports = router;
