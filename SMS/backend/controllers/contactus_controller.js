const Contact = require("../models/contactus_model");

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

async function getAllContacts(req, res) {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createNewContact(req, res) {
  try {
    const { name, location, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email, and message are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const newContact = new Contact({ name, location, email, phone, message });
    await newContact.save();

    res
      .status(201)
      .json({ msg: "Contact form submitted successfully", newContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getContactById(req, res) {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteContact(req, res) {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ msg: "Contact deleted", deletedContact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllContacts,
  createNewContact,
  getContactById,
  deleteContact,
};
