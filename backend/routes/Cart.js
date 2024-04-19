const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product'); // Added import for Product schema

// Route to add a product to the cart
router.post('/cart', async (req, res) => {
    const { customerId, productId, quantity } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ customerId });

        if (!cart) {
            cart = new Cart({ customerId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId === productId);

        if (existingItemIndex !== -1) {
            // If the product already exists in the cart, update its quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // If the product is not in the cart, add it
            cart.items.push({
                productId,
                itemName: product.itemName,
                price: product.price,
                quantity,
                image: product.image
            });
        }

        await cart.save();

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add product to cart' });
    }
});

// Route to fetch cart items for a user
router.get('/cart', async (req, res) => {
    const { customerId } = req.query;

    try {
        const cart = await Cart.findOne({ customerId });

        if (cart) {
            res.status(200).json({ items: cart.items });
        } else {
            res.status(200).json({ items: [] });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch cart items' });
    }
});

module.exports = router;
