// routes/cart.js

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Route to add an item to the cart
router.post('/add/:productId', async (req, res) => {
    const { userId } = req.body;
    const productId = req.params.productId;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If the cart doesn't exist for the user, create a new cart
            cart = new Cart({
                userId,
                items: []
            });
        }

        // Check if the product already exists in the cart
        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex !== -1) {
            // If the product exists in the cart, increase its quantity
            cart.items[itemIndex].quantity += 1;
        } else {
            // If the product doesn't exist in the cart, add it with quantity 1
            cart.items.push({ productId, quantity: 1 });
        }

        // Calculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + (item.quantity * item.productId.price);
        }, 0);

        // Save the updated cart
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
});

module.exports = router;
