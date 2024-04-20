// confirmedAdsModel.js

const mongoose = require('mongoose');

const ConfirmedAdsSchema = new mongoose.Schema({
  ownerName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      pet_type: {
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
      contact: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
}, { timestamps: false });

module.exports = mongoose.model('ConfirmedAds', ConfirmedAdsSchema);