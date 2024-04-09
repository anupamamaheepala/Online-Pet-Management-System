// models/Salary.js

const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
    
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  basicSalary: {
    type: Number,
    required: true
  },
  otHours: {
    type: Number,
    required: true
  },
  otAmount: {
    type: Number,
    required: true
  },
  bonusAmount: {
    type: Number,
    required: true
  },
  totalSalary: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Salary = mongoose.model('Salary', SalarySchema);

module.exports = Salary;
