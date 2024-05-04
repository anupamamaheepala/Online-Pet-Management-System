const express = require('express');
const Cart = require('../models/CartModel');
const router = express.Router();

// Define the POST route to add items to the cart
router.post('/', async (req, res) => {
  const { productId, customerId } = req.body;  // Assuming customerId is sent from the client
  if (!customerId) {
    return res.status(400).json({ message: 'Customer ID is required' });
  }
  console.log(productId);
  try {
    let cart = await Cart.findOne({ customerId });
    console.log(cart);

    if (!cart) {
      cart = new Cart({ customerId, items: [{ productId, quantity: 1 }] });
    } else {
      const existingItem = cart.items.find(item => item.productId.equals(productId));
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    res.status(201).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
});

module.exports = router; // Ensure the route is exported correctly
