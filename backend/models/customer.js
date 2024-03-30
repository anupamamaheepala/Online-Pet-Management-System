const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  username: String,
  email: String,
  contactNumber: String,
  address: String,
  password: String
});

module.exports = mongoose.model('Customer', customerSchema);