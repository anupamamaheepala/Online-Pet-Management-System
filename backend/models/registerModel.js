const mongoose = require('mongoose');


const registerSchema = new mongoose.Schema({
  username: String,
  email: String,
  contactNumber: String,
  address: String,
  password: String
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
