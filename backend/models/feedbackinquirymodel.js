const mongoose = require('mongoose');

const feedbackinquirySchema = new mongoose.Schema({
  inquiry: {
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('FeedbackInquiry', feedbackinquirySchema);
