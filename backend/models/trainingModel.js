const mongoose = require('mongoose');

const TrSchema = new mongoose.Schema({
  ownerName: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      contact: {
        type: String,
        required: true
      },
      dogName: {
        type: String,
        required: true
      },
      breed: {
        type: String,
        required: true
      },
      age: {
        type: String,
        required: true
      }
        

},{timestamps: false})

module.exports = mongoose.model('training', TrSchema)







