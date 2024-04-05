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
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
