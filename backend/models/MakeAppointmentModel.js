const mongoose = require('mongoose');

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
  selectService: {
    type: String,
    required: true
  },
  selectDate: { 
    type: Date, 
    required: true 
  },

  selectTime: {
    type: String,
    required: true
  },
  selectProfession: {
    type: String,
    required: true
  },
  IsAccept: { 
    type: Boolean,
     default: false 
    },
      
  IsPaid: {
     type: Boolean,
     default: false 
    },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;