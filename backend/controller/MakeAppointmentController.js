const Appointment = require('../models/MakeAppointmentModel');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { ownerName, ownerEmail, ownerContact, petType, selectService, selectDate, selectTime, selectProfession} = req.body;

    // Check if required fields are provided
    if (!ownerName || !ownerEmail || !ownerContact || !petType || !selectService || !selectDate || !selectTime || !selectProfession ) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const parsedSelectDate = new Date(selectDate); // Parse selectDate as a Date object
    // Create a new appointment
    const newAppointment = new Appointment({
      ownerName,
      ownerEmail,
      ownerContact,
      petType,
      selectService,
      selectDate: parsedSelectDate,
      selectTime,
      selectProfession,
    });

    // Save the appointment to the database
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};