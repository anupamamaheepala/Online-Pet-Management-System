// controllers/paymentController.js

const Payerinfo = require("../models/paymentModel");

// Controller function for handling payment-related operations
const paymentController = {
  // Method for adding payer information
  addPayerInfo: async (req, res) => {
    try {
      const { name, email, phonenumber, address } = req.body;

      if (!name || !email || !phonenumber || !address) {
        return res.status(400).json({ message: "All fields are required!" });
      }

      const income = new Payerinfo({
        name,
        email,
        phonenumber,
        address,
      });

      await income.save();
      res.status(200).json({ message: "Payer information added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = paymentController;