// // module.exports = router;

// // registerRoute.js
// const express = require('express');
// const router = express.Router();
// const registerController = require("../controller/registerController");
// const Customer = require('../models/registerModel');
// const bcrypt = require('bcrypt');


// // Register a new customer
// router.post("/register", registerController.registerCustomer);

// // Get all customers
// router.get("/", registerController.getAllCustomers);

// // Get customer by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const customer = await Customer.findById(req.params.id);
//     if (!customer) {
//       return res.status(404).json({ message: "Customer not found" });
//     }
//     res.json(customer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch customer details" });
//   }
// });

// // Update customer by ID
// router.put("/:id", registerController.updateCustomer);

// // Delete a customer by ID
// router.delete("/:id", registerController.deleteCustomerById);

// // Sign-in endpoint
// router.post('/signin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists in the database
//     const user = await Customer.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Compare the provided password with the hashed password in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // If the credentials are valid, return a success message
//     res.status(200).json({ message: 'Sign-in successful', user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // Route for resetting password
// router.put('/reset-password', async (req, res) => {
//   const { customerId, oldPassword, newPassword } = req.body; // Extract customerId from req.body

//   try {
//     // Fetch the user using the customer ID
//     const user = await Customer.findById(customerId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Verify if the old password matches
//     const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Old password is incorrect' });
//     }

//     // Hash the new password
//     const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password
//     await Customer.findByIdAndUpdate(customerId, { password: hashedNewPassword });

//     // Send success response
//     res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


// module.exports = router;

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



