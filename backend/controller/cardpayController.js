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

      // Mask the first 14 digits of the card number with asterisks (*) and keep the last 4 digits
      const maskedCardNumber = maskCardNumber(cardNumber);

      // Mask the CVV with asterisks (*)
      const maskedCvv = cvv.replace(/\d/g, '*');

      const cardPayment = new CardPayment({
        nameOnCard,
        cardNumber: maskedCardNumber, // Store the masked card number
        cvv: maskedCvv, // Store the masked CVV
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

// Function to mask the card number
const maskCardNumber = (cardNumber) => {
  // Extract the first 14 digits and mask them with asterisks (*) 
  const maskedPart = cardNumber.substring(0, 14).replace(/\d/g, '*');
  // Concatenate the masked part with the last 4 digits
  const last4Digits = cardNumber.substring(14);
  return maskedPart + last4Digits;
};

module.exports = cardPaymentController;
