const express = require('express');

const router = express.Router();
 // Import multer
// Import path module
const MakeAppointmentController = require('../controller/MakeAppointmentController');
const{
  createAppointment,
}=require('../controller/MakeAppointmentController');

// Define a route to handle appointment submissions
router.post('/appointments', createAppointment);

// Export the router
module.exports = router;
