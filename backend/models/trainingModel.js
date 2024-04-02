// const mongoose = require('mongoose');

// const trainingSchema = new mongoose.Schema({
//   ownerName: String,
//   address: String,
//   contact: String,
//   dogName: String,
//   breed: String,
//   age: Number,
//   lastVaccinatedDate: Date,
//   vaccinationName: String,
//   firstTime: Boolean,
//   trainingCenter: String,
//   trainingType: String,
//   bringToCenter: Boolean,
//   additionalPayment: Boolean,
//   report: {
//     data: Buffer,
//     contentType: String,
//   },
//   date: Date,
// });

// const Training = mongoose.model('Training', trainingSchema);

// module.exports = Training;




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







