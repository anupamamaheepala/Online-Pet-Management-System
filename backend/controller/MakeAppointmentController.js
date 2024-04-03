const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Define a route to handle appointment submissions
router.post('/appointments', async (req, res) => {
  try {
    // Extract form data from the request body
    const { ownerName, ownerEmail, ownerContact, petType } = req.body;

    // Create a new appointment object
    const newAppointment = new Appointment({
      ownerName,
      ownerEmail,
      ownerContact,
      petType
    });

    // Save the appointment to the database
    await newAppointment.save();

    // Send a success response
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
