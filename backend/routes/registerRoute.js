// routes/registerRoute.js
const express = require('express');
const router = express.Router();
const registerController = require("../controller/registerController");
const customerSchema = require('../models/registerModel');
const bcrypt = require('bcrypt');

// Register a new customer
router.post("/register", registerController.registerCustomer);

// Get all customers
router.get("/", registerController.getAllCustomers);

// Get customer by ID
router.get("/:id", registerController.getCustomerById);

// Update customer by ID
router.put("/:id", registerController.updateCustomer);

// Delete a customer by ID
router.delete("/:id", registerController.deleteCustomerById);

// Sign-in endpoint
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await customerSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If the credentials are valid, return a success message
    res.status(200).json({ message: 'Sign-in successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;





