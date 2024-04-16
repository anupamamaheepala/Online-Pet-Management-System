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
    default: null
  },
  // age: {
  //   type: Number,
  //   required: true
  // },
  age: {
    type: {
        value: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            enum: ['years', 'months', 'days'], // Allowed age units
            required: true
        }
    },
    required: true
},
  gender: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    default: null
  },
  dateAdopted: {
    type: Date,
    default: null
  },
  additionalNotes: {
    type: String,
    default: null
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

