const express = require("express");
const Announcement = require("../models/announcements_model");
const {getAllAnnouncements, createNewAnnouncement, getAnnouncementById, updateAnnouncement, deleteAnnouncement} = require("../controllers/announcement_controller");
const router = express.Router();

router.route('/')
    .get(getAllAnnouncements)
    .post(createNewAnnouncement);

router.route('/:id')
    .get(getAnnouncementById)
    .put(updateAnnouncement)
    .delete(deleteAnnouncement)

module.exports = router;