const express = require("express");
const router = express.Router();
const cardpayController = require("../controller/cardpayController");

// Route for processing card payment
router.post("/cpay", cardpayController.processCardPayment);

// Route for getting all card payments with payer info
router.get("/cardpayments", cardpayController.getAllCardPaymentsWithPayerInfo);

// Add a new endpoint to fetch payer details
router.get("/payerdetails/:id", cardpayController.getPayerDetails);

// Route for getting card payment by payerId
router.get("/cardpayments/:id", cardpayController.getCardPaymentByPayerId);

module.exports = router;