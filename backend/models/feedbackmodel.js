const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  // likes: {
  //   type: Number,
  //   default: 0
  // },
  // dislikes: {
  //   type: Number,
  //   default: 0
  // },
  // replies: [
  //   {
  //     user: String,
  //     reply: String
  //   }
  // ],
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // },

  // customerName: {
  //   type: String,
  //   required: true
  // }
  // // customerEmail: {
  // //   type: String,
  // //   required: true
  // // },
  // // customerContactNumber: {
  // //   type: String,
  // //   required: true
  // // },
  // // inquiryType: {
  // //   type: String,
  // //   required: true
  // // },
  // // inquiryDescription: {
  // //   type: String,
  // //   required: true
  // // },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
