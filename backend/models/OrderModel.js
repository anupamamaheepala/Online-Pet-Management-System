const mongoose = require('mongoose');

// Define the order schema
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
  },
  deliveryDate: {
    type: String, 
    required: true
  }
}, { timestamps: true }); 

module.exports = mongoose.model('Order', orderSchema); // Export the Order model
