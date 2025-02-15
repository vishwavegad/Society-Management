const Announcement = require("../models/announcements_model");

async function getAllAnnouncements(req, res){
    try{
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

async function createNewAnnouncement(req, res){
    try{
        const {title, description} = req.body;
        if(!title || !description){
            return res.status(400).json({error: "All fields are required"});
        }
        const newAnnouncement = new Announcement({title, description});
        await newAnnouncement.save();

        res.status(201).json({msg: "Announcement created successfully", newAnnouncement});
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports = {getAllAnnouncements, createNewAnnouncement};