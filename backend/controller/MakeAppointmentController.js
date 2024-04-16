const Appointment = require('../models/MakeAppointmentModel');
const jwt = require('jsonwebtoken');

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
// Fetch appointments for a specific user
exports.getUserAppointments = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'PETZONE');
    const userEmail = decodedToken.email;

    try {
      const appointments = await Appointment.find({ ownerEmail: userEmail });
      res.status(200).json({ appointments });
    } catch (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    } else {
      console.error('Error verifying token:', err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
};

