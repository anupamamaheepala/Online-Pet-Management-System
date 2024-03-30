// routes/register.js

const express = require('express');
const Customer = require('../models/customer');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, contactNumber, address, password } = req.body;
    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const customer = new Customer({
      username,
      email,
      contactNumber,
      address,
      password
    });

    await customer.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration Error: ', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
