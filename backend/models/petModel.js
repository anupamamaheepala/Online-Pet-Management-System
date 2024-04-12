// petModel.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  dateAdopted: {
    type: Date,
    required: true
  },
  additionalNotes: {
    type: String,
    required: true
  },
  vaccinations: [
    {
      vaccineType: {
        type: String,
        required: true,
      },
      dateAdministered: {
        type: Date,
        required: true,
      },
    },
  ],
  profilePhoto: {
    type: String, // Assuming the profile photo will be stored as a URL
    default: '' // Default empty string for profile photo
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer', // Assuming you have a Customer model for the pet owner
      }
});

module.exports = mongoose.model('Pet', petSchema);

