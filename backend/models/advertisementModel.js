
const mongoose = require('mongoose');

const AddsSchema = new mongoose.Schema({
  ownerName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      Breed: {
        type: String,
        required: true
      },
      purpose: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      filePath: {
        type: String,
        required: true
       },
      price: {
        type: String,
        required: true
      },
      contact: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
        

},{timestamps: false})

module.exports = mongoose.model('Ads', AddsSchema)







// // // advertisementModel.js

// // const mongoose = require('mongoose');

// // const advertisementSchema = new mongoose.Schema({
// //   ownerName: {
// //     type: String,
// //     required: true
// //   },
// //   email: {
// //     type: String,
// //     required: true
// //   },
// //   title: {
// //     type: String,
// //     required: true
// //   },
// //   Breed: {
// //     type: String,
// //     required: true
// //   },
// //   purpose: {
// //     type: String,
// //     required: true
// //   },
// //   description: {
// //     type: String,
// //     required: true
// //   },
// //   price: {
// //     type: String,
// //     required: true
// //   },
// //   contact: {
// //     type: String,
// //     required: true
// //   },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   }
// // });


// // const Advertisement = mongoose.model('Advertisement', advertisementSchema);

// // module.exports = Advertisement;
