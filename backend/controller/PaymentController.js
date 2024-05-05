const Payerinfo = require("../models/paymentModel");

const paymentController = {
  // Method for adding payer information
  addPayerInfo: async (req, res) => {
    try {
      const { name, email, phonenumber, address, purpose, amount } = req.body;

      if (!name || !email || !phonenumber || !address || !purpose || !amount) {
        return res.status(400).json({ message: "All fields are required!" });
      }

      // Check if email already exists
      const existingPayer = await Payerinfo.findOne({ email });

      if (existingPayer) {
        // If email already exists, check if the provided name matches the existing name
        if (existingPayer.name !== name) {
          return res.status(400).json({ message: "Email already exists. Please use the same name." });
        }
      }

      const payerInfo = new Payerinfo({
        name,
        email,
        phonenumber,
        address,
        purpose,
        amount,
      });

      await payerInfo.save();
      res.status(200).json({ message: "Payer information added successfully", _id: payerInfo._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  // Method for getting payer information by ID
  getCustomerById: async (req, res) => {
    try {
      const payerInfo = await Payerinfo.findById(req.params.id);
      res.json(payerInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch payer details" });
    }
  },

  deletePayerInfo: async (req, res) => {
    try {
      const payerId = req.params.id;
      const deletedPayerInfo = await Payerinfo.findByIdAndDelete(payerId);
      if (!deletedPayerInfo) {
        return res.status(404).json({ message: "Payer information not found" });
      }
      res.status(200).json({ message: "Payer information deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  updatePayerInfo: async (req, res) => {
    try {
      const { name, email, phonenumber, address, purpose, amount } = req.body;
      const payerId = req.params.id;

      if (!name || !email || !phonenumber || !address || !purpose || !amount) {
        return res.status(400).json({ message: "All fields are required!" });
      }

      const updatedPayerInfo = await Payerinfo.findByIdAndUpdate(
        payerId,
        { name, email, phonenumber, address, purpose, amount },
        { new: true }
      );

      res.status(200).json(updatedPayerInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = paymentController;


