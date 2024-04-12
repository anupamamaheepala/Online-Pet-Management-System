const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const registerController = require('../controller/registerController');

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
router.post('/signin', registerController.signIn);

// Route for resetting password
router.put('/reset-password', registerController.resetPassword);

module.exports = router;



