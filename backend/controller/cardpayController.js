// controllers/cardPaymentController.js

const CardPayment = require("../models/cardpayModel");

// Controller function for handling card payment-related operations
const cardPaymentController = {
  // Method for processing card payment
  processCardPayment: async (req, res) => {
    try {
      const { nameOnCard, cardNumber, cvv, expireDate } = req.body;

      if (!nameOnCard || !cardNumber || !cvv || !expireDate) {
        return res.status(400).json({ message: "All fields are required!" });
      }

      const cardPayment = new CardPayment({
        nameOnCard,
        cardNumber,
        cvv,
        expireDate,
      });

      await cardPayment.save();
      res.status(200).json({ message: "Card payment processed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = cardPaymentController;
