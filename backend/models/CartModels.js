const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    customerId: String,
    items: [{
        productId: String,
        itemName: String,
        price: Number,
        quantity: Number,
        image: String
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
