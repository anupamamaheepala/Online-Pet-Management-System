const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/MakeAppointmentController');


// Route to handle appointment creation
router.post('/appointments', appointmentController.createAppointment);

module.exports = router;

