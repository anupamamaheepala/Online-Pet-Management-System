const Customer = require("../models/registerModel");
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');

// Schema for password validation
const schema = new passwordValidator();
schema
  .is().min(8) // Minimum length 8 characters
  .is().max(100) // Maximum length 100 characters
  .has().uppercase() // Must have at least one uppercase letter
  .has().lowercase() // Must have at least one lowercase letter
  .has().digits() // Must have at least one digit
  .has().symbols(); // Must have at least one special character


// Register a new customer
exports.registerCustomer = async (req, res) => {
  const { username, email, contactNumber, address, password, confirmPassword } = req.body;

   // Validate password
   if (!schema.validate(password)) {
    return res.status(400).json({ message: "Password does not meet the requirements." });
  }

  // Check if the email already exists in the database
  try {
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already exists. Please use a different email." });
    }



  //validations
  
    if (!username || !email || !contactNumber || !address || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password and confirm password should be the same" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds

    const customer = new Customer({
      username,
      email,
      contactNumber,
      address,
      password: hashedPassword,
    });

    //saving data into the database
    await customer.save();
    res.status(200).json({ message: "Customer registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
      const customers = await Customer.find();
      res.json(customers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch customer details" });
    }
  };
  
  // Delete a customer by ID
  exports.deleteCustomerById = async (req, res) => {
    try {
      await Customer.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete customer" });
    }
  };

  // Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch customer details" });
  }
};

// Update customer details
exports.updateCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update customer" });
  }
};








