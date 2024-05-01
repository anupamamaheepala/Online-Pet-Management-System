const mongoose = require('mongoose');

const StaffLeaveSchema = new mongoose.Schema({
  staffId: {
    type: String,
    required: true
  },
  StleaveFromDate: {
    type: Date,
    required: true
  },
  StleaveToDate: {
    type: Date,
    required: true
  },
  StleaveType: {
    type: String,
    required: true
  },
  streason: {
    type: String,
    required: false
  },
  approved: {
    type: Boolean,
    default: false // Default value is false, indicating leave is not approved initially
  },

  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Disapproved'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('StaffLeave', StaffLeaveSchema);

