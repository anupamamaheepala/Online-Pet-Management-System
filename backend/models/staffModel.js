const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  staffId: {
    type: String,
    required: true,
    unique: true // Ensures staffId is unique
  },
  sfirstname: {
    type: String,
    required: true
  },
  slastname: {
    type: String,
    required: true
  },
  snic: {
    type: String,
    required: true
  },
  semail: {
    type: String,
    required: true,
    unique: true
  },
  scontactNumber: {
    type: String,
    required: true
  },
  saddress: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  qualifications: {
    type: String,
    required: true
  }

},{timestamps: false});

module.exports = mongoose.model('Staff', StaffSchema); // Changed model name to 'Staff'