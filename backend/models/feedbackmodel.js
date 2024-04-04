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
        
        createdAt: {
          type: Date,
          default: Date.now
        }
          
  
  },{timestamps: false})
  
  module.exports = mongoose.model('feedback', feedbackSchema)