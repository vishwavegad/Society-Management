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

async function getAnnouncementById(req, res){
    try{
        const announcement = await Announcement.findById(req.params.id);
        if(!announcement){
            return res.status(404).json({error: "Announcement not found"});
        }
        res.status(200).json(announcement);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

async function updateAnnouncement(req, res){
    try{
        const {title, description} = req.body;
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            req.params.id,
            {title, description},
            {new: true, runValidators: true}
        )
        if(!updatedAnnouncement){
            return res.status(404).json({error: "Announcement not found"});
        }
        res.status(200).json({msg: "Announcement updated", updatedAnnouncement});
    } catch(error){
        res.json(500).status({error: error.message});
    }
}

async function deleteAnnouncement(req, res){
    try{
        const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params.id);
        if(!deletedAnnouncement){
            return res.status(404).json({error: "Announcement not found"});
        }
        res.status(200).json({msg: "Announcement deleted", deletedAnnouncement});
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports = {getAllAnnouncements, createNewAnnouncement, getAnnouncementById, updateAnnouncement, deleteAnnouncement};