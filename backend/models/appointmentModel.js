const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  petOwnerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  petType: {
    type: String,
    required: true
  },
  service: {
    type: String,
    enum: ['veterinary', 'grooming'],
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  veterinarian: {
    type: String,
    required: true
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
