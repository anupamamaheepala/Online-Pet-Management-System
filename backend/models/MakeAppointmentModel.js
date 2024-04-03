const mongoose = require('mongoose');

// Define schema for appointment
const appointmentSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true
  },
  ownerEmail: {
    type: String,
    required: true
  },
  ownerContact: {
    type: String,
    required: true
  },
  petType: {
    type: String,
    required: true
  },
  
});

// Create Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Export Appointment model
module.exports = Appointment;
