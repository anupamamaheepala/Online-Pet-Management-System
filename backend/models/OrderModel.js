const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderName: {
    type: String,
    required: true
  },
  orderContactNo: {
    type: String,
    required: true
  },
  orderAddress: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Order', orderSchema);
