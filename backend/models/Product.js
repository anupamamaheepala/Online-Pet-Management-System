// models/Product.js

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
    description: {
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
    }
});

module.exports = mongoose.model('Product', productSchema);
