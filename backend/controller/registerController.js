const Customer = require("../models/registerModel");
const bcrypt = require('bcrypt');

// Register a new customer
exports.registerCustomer = async (req, res) => {
  const { username, email, contactNumber, address, password, confirmPassword } = req.body;

  //validations
  try {
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

