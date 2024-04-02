const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentModel');

// Route to add a new appointment
router.post('/insertappointments', async (req, res) => {
  try {
    const { name, email, contactNumber, petType, service, date, startTime, veterinarian } = req.body;
    const newAppointment = new Appointment({
      name,
      email,
      contactNumber,
      petType,
      service,
      date,
      startTime,
      veterinarian
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
