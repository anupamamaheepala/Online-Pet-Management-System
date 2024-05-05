// const express = require('express');
// const Cart = require('../models/CartModel');
// const Product = require('../models/Product'); // Import Product model
// const router = express.Router();

// // Define the POST route to add items to the cart
// router.post('/', async (req, res) => {
//   const { productId, customerId } = req.body; // Assuming customerId is sent from the client
//   if (!customerId) {
//     return res.status(400).json({ message: 'Customer ID is required' });
//   }

//   try {
//     let cart = await Cart.findOne({ customerId }).populate('items.productId'); // Populate product details in cart items
//     console.log(cart);

//     if (!cart) {
//       cart = new Cart({ customerId, items: [{ productId, quantity: 1 }] });
//     } else {
//       const existingItem = cart.items.find((item) => item.productId.equals(productId));
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         cart.items.push({ productId, quantity: 1 });
//       }
//     }

//     await cart.save();
//     // Populate product details in the saved cart before sending the response
//     await cart.populate('items.productId').execPopulate();
//     res.status(201).json({ message: 'Product added to cart', cart });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding to cart', error });
//   }
// });jg

// router.get('/:customerId', async (req, res) => {
//   const { customerId } = req.params;

//   try {
//     const cart = await Cart.findOne({ customerId }).populate('items.productId'); // Populate product details
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching cart', error });
//   }
// });

// module.exports = router; // Ensure the route is exported correctly
const express = require('express');
const Cart = require('../models/CartModel');
const Product = require('../models/Product'); // Import Product model
const router = express.Router();

// Define the POST route to add items to the cart
router.post('/', async (req, res) => {
  const { productId, customerId } = req.body; // Assuming customerId is sent from the client
  if (!customerId) {
    return res.status(400).json({ message: 'Customer ID is required' });
  }

  try {
    let cart = await Cart.findOne({ customerId }).populate('items.productId'); // Populate product details in cart items
    console.log(cart);

    if (!cart) {
      cart = new Cart({ customerId, items: [{ productId, quantity: 1 }] });
    } else {
      const existingItem = cart.items.find((item) => item.productId.equals(productId));
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    // Populate product details in the saved cart before sending the response
    await cart.populate('items.productId').execPopulate();
    res.status(201).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
});

router.get('/:customerId', async (req, res) => {
  const { customerId } = req.params;

  try {
    const cart = await Cart.findOne({ customerId }).populate('items.productId'); // Populate product details
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

module.exports = router; // Ensure the route is exported correctly
