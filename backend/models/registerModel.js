const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactNumbers: {
    type: [String], 
    required: true,
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'At least one contact number is required.'
    }
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String, // Assuming the profile photo will be stored as a URL
    default: '' 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
    

},{timestamps: false})
 

module.exports= mongoose.model('customer', customerSchema)

