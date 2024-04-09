// // petModel.js
// const mongoose = require('mongoose');

// const petSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   breed: {
//     type: String
//   },
//   age: {
//     type: Number
//   },
//   ownerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Customer', // Assuming your customer model is named 'Customer'
//     required: true
//   }
// });

// module.exports = mongoose.model('Pet', petSchema);
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
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer', // Assuming you have a Customer model for the pet owner
      }
});

module.exports = mongoose.model('Pet', petSchema);

