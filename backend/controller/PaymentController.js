// // controllers/paymentController.js

// const Payerinfo = require("../models/paymentModel");

// // Controller function for handling payment-related operations
// const paymentController = {
//   // Method for adding payer information
//   addPayerInfo: async (req, res) => {
//     try {
//       const { name, email, phonenumber, address } = req.body;

//       if (!name || !email || !phonenumber || !address) {
//         return res.status(400).json({ message: "All fields are required!" });
//       }

//       const income = new Payerinfo({
//         name,
//         email,
//         phonenumber,
//         address,
//       });

//       await income.save();
//       res.status(200).json({ message: "Payer information added successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   },

// };

// module.exports = paymentController;


const Payerinfo = require("../models/paymentModel");

// Controller function for handling payment-related operations
const paymentController = {
  // Method for adding payer information
  addPayerInfo: async (req, res) => {
    try {
      const { name, email, phonenumber, address, purpose, amount } = req.body;

      if (!name || !email || !phonenumber || !address || !purpose || !amount) {
        return res.status(400).json({ message: "All fields are required!" });
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
};

module.exports = paymentController;


