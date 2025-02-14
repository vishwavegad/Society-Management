const express = require("express");
const Announcement = require("../models/announcements_model");
const {getAllAnnouncements, createNewAnnouncement} = require("../controllers/announcement_controller");
const router = express.Router();

router.route('/')
    .get(getAllAnnouncements)
    .post(createNewAnnouncement);

module.exports = router;