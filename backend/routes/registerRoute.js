// // routes/registerRoute.js
// const express = require('express');
// const router = express.Router();
// const registerController = require("../controller/registerController");
// const customerSchema = require('../models/registerModel');
// const bcrypt = require('bcrypt');

// // Register a new customer
// router.post("/register", registerController.registerCustomer);

// // Get all customers
// router.get("/", registerController.getAllCustomers);

// // Get customer by ID
// router.get("/:id", registerController.getCustomerById);

// // Update customer by ID
// router.put("/:id", registerController.updateCustomer);

// // Delete a customer by ID
// router.delete("/:id", registerController.deleteCustomerById);

// // Sign-in endpoint
// router.post('/signin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists in the database
//     const user = await customerSchema.findOne({ email });

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


// module.exports = router;

// registerRoute.js
const express = require('express');
const router = express.Router();
const registerController = require("../controller/registerController");
const Customer = require('../models/registerModel');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware'); // Import your authentication middleware


// Register a new customer
router.post("/register", registerController.registerCustomer);

// Get all customers
router.get("/", registerController.getAllCustomers);

// Get customer by ID
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch customer details" });
  }
});

// Update customer by ID
router.put("/:id", registerController.updateCustomer);

// Delete a customer by ID
router.delete("/:id", registerController.deleteCustomerById);

// Sign-in endpoint
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await Customer.findOne({ email });

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

// Reset password endpoint
router.post('/reset-password', async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const customerId = req.user.id; // Assuming the user ID is attached to the request object by the authentication middleware

  try {
    // Fetch the customer from the database
    const customer = await Customer.findById(customerId);

    // Check if the current password provided matches the password in the database
    const isPasswordValid = await bcrypt.compare(currentPassword, customer.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the customer's password in the database
    await Customer.findByIdAndUpdate(customerId, { password: hashedNewPassword });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;




