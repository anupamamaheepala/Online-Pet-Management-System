const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/MakeAppointmentController');


// Route to handle appointment creation
router.post('/appointments', appointmentController.createAppointment);

// Route to fetch appointments for a specific user
router.get('/user-appointments', appointmentController.getUserAppointments);

module.exports = router;

