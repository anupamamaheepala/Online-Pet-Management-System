// advertisementModel.js

const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
