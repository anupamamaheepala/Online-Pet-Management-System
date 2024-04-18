// models/cart.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to the Product model
                required: true
            },
            quantity: {
                type: Number,
                default: 1 // Default quantity is 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        default: 0 // Default total price is 0
    }
});

module.exports = mongoose.model('Cart', cartSchema);
