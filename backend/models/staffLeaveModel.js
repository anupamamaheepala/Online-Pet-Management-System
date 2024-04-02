const mongoose = require('mongoose');

const StaffLeaveSchema = new mongoose.Schema({
  sfirstname: {
    type: String,
    required: true
  },
  slastname: {
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
    required: true
  }
}, { timestamps: false });

module.exports = mongoose.model('StaffLeave', StaffLeaveSchema);
