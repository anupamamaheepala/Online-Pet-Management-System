const express = require('express');
const router = express.Router();
const Cart = require('../models/CartModel');
const Order = require('../models/OrderModel');
const moment = require('moment');

// Add or update items in the cart
router.post('/', async (req, res) => {
  const { productId, customerId, quantity } = req.body;
  if (!customerId || !productId) {
    return res.status(400).json({ message: 'Customer ID and Product ID are required' });
  }

  try {
    let cart = await Cart.findOne({ customerId }).populate('items.productId');
    if (!cart) {
      cart = new Cart({ customerId, items: [{ productId, quantity }] });
    } else {
      const existingItem = cart.items.find(item => item.productId.equals(productId));
      if (existingItem) {
        existingItem.quantity = quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }
    await cart.save();
    await cart.populate('items.productId').execPopulate();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
});

// Get cart by customer ID
router.get('/:customerId', async (req, res) => {
  const { customerId } = req.params;
  try {
    const cart = await Cart.findOne({ customerId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

// Delete an item from the cart
router.delete('/:customerId/:productId', async (req, res) => {
  const { customerId, productId } = req.params;
  console.log(`Removing product ${productId} for customer ${customerId}`);  // Log the operation

  try {
    let cart = await Cart.findOne({ customerId });
    if (!cart) {
      console.log('Cart not found');  // Log if cart is not found
      return res.status(404).json({ message: 'Cart not found' });
    }
    console.log('Current items:', cart.items);  // Log current items
    cart.items = cart.items.filter(item => !item.productId.equals(productId));
    console.log('Items after removal:', cart.items);  // Log items after attempted removal
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
});

// Checkout and create an order from the cart
router.post('/checkout', async (req, res) => {
  const { customerId, orderAddress } = req.body;

  try {
    // Find the customer's cart
    const cart = await Cart.findOne({ customerId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Calculate delivery date (5 working days from the current date)
    const deliveryDate = moment().add(5, 'days').format('YYYY-MM-DD');

    // Create a new order with cart items and customer info
    const newOrder = new Order({
      customer: customerId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      orderAddress,
      deliveryDate
    });

    // Save the new order
    await newOrder.save();

    // Optionally clear the cart
    await Cart.findByIdAndDelete(cart._id);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Server error processing checkout:', error);
    res.status(500).json({ error: 'Server error processing checkout' });
  }
});

module.exports = router;
