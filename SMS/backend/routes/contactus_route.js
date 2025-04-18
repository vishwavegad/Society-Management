const express = require("express");
const Contact = require("../models/contactus_model");
const {
  createNewContact,
  getAllContacts,
  getContactById,
  deleteContact,
} = require("../controllers/contactus_controller");

const router = express.Router();

router.route("/").get(getAllContacts).post(createNewContact);

router.route("/:id").get(getContactById).delete(deleteContact);

module.exports = router;
