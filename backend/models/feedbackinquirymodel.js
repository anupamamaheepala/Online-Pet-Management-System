const mongoose = require('mongoose');

const feedbackinquirySchema = new mongoose.Schema({
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
  reply: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('FeedbackInquiry', feedbackinquirySchema);
