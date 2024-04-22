const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController');


// Register a new customer
router.post("/register", registerController.registerCustomer);

// Route for uploading profile photo
router.put('/profile-photo/:customerId', registerController.uploadProfilePhoto);

// Add this route for deleting a customer's profile photo
router.delete('/profile-photo/:customerId', registerController.deleteProfilePhoto);

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

// resetting password
router.post('/reset-password/:customerId', registerController.resetPassword);



module.exports = router;



