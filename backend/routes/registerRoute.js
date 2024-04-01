// routes/registerRoute.js

const express = require('express');
const router = express.Router();
const Register = require('../model/registerModel.js');

// Create a new registration
router.post('/', async (req, res) => {
  try {
    const register = await Register.create(req.body);
    res.status(201).json(register);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all registrations
router.get('/', async (req, res) => {
  try {
    const registrations = await Register.find();
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific registration
router.get('/:id', getRegister, (req, res) => {
  res.json(res.register);
});

// Update a registration
router.patch('/:id', getRegister, async (req, res) => {
  if (req.body.username != null) {
    res.register.username = req.body.username;
  }
  if (req.body.email != null) {
    res.register.email = req.body.email;
  }
  if (req.body.contactNumber != null) {
    res.register.contactNumber = req.body.contactNumber;
  }
  if (req.body.address != null) {
    res.register.address = req.body.address;
  }
  if (req.body.password != null) {
    res.register.password = req.body.password;
  }
  try {
    const updatedRegister = await res.register.save();
    res.json(updatedRegister);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a registration
router.delete('/:id', getRegister, async (req, res) => {
  try {
    await res.register.remove();
    res.json({ message: 'Deleted Registration' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get registration by ID
async function getRegister(req, res, next) {
  try {
    const register = await Register.findById(req.params.id);
    if (register == null) {
      return res.status(404).json({ message: 'Cannot find registration' });
    }
    res.register = register;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
