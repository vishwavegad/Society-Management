const AmenityBooking = require("../models/amenitiesform_model");

// Get all bookings
async function getAllBookings(req, res) {
  try {
    const bookings = await AmenityBooking.find().sort({ date: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create new booking
async function createNewBooking(req, res) {
  try {
    const {
      name,
      contact,
      flat,
      amenity,
      functionName,
      date,
      timeSlot,
      guests,
      duration,
      paymentAmount,
    } = req.body;

    if (
      !name ||
      !contact ||
      !flat ||
      !amenity ||
      !date ||
      !timeSlot ||
      !duration ||
      !paymentAmount
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    const newBooking = new AmenityBooking({
      name,
      contact,
      flat,
      amenity,
      functionName: amenity === "Other" ? functionName : null,
      date,
      timeSlot,
      guests,
      duration,
      paymentAmount,
      status: "Pending"
    });

    await newBooking.save();
    res.status(201).json({ msg: "Amenity booked successfully", newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get booking by ID
async function getBookingById(req, res) {
  try {
    const booking = await AmenityBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update booking
async function updateBooking(req, res) {

  try {
    const { status } = req.body; // Get the status value from the request body

    if (!status || !["Booked", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedBooking = await AmenityBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ msg: "Booking status updated", updatedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
  // try {
  //   const {
  //     name,
  //     contact,
  //     flat,
  //     amenity,
  //     functionName,
  //     date,
  //     timeSlot,
  //     guests,
  //     duration,
  //     paymentAmount,
  //   } = req.body;

  //   const updatedBooking = await AmenityBooking.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //       name,
  //       contact,
  //       flat,
  //       amenity,
  //       functionName,
  //       date,
  //       timeSlot,
  //       guests,
  //       duration,
  //       paymentAmount,
  //     },
  //     { new: true, runValidators: true }
  //   );

  //   if (!updatedBooking) {
  //     return res.status(404).json({ error: "Booking not found" });
  //   }

  //   res.status(200).json({ msg: "Booking updated", updatedBooking });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
}

// Delete booking
async function deleteBooking(req, res) {
  try {
    const deletedBooking = await AmenityBooking.findByIdAndDelete(
      req.params.id
    );
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ msg: "Booking deleted", deletedBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllBookings,
  createNewBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
};
