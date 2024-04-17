const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/MakeAppointmentController');

// Route to handle appointment creation
router.post('/appointments', appointmentController.createAppointment);

// Route to handle fetching appointments
router.get('/appointments', appointmentController.getAppointments);

// Route to handle deleting an appointment
router.delete('/appointments/:id', appointmentController.deleteAppointment);

// Route to handle updating an appointment
router.put('/appointments/:id', appointmentController.updateAppointment);

module.exports = router;
