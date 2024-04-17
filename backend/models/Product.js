const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
 
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0  // Assuming initial quantity is zero
    }
});

module.exports = mongoose.model('Product', productSchema);
