const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  ownerName: String,
  address: String,
  contact: String,
  dogName: String,
  breed: String,
  age: Number,
  lastVaccinatedDate: Date,
  vaccinationName: String,
  firstTime: Boolean,
  trainingCenter: String,
  trainingType: String,
  bringToCenter: Boolean,
  additionalPayment: Boolean,
  report: {
    data: Buffer,
    contentType: String,
  },
  date: Date,
});

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
