const express = require("express");
const router = express.Router();
const cardpayController = require("../controller/cardpayController");

// Route for processing card payment
router.post("/cpay", cardpayController.processCardPayment);

// Route for getting all card payments with payer info
router.get("/cardpayments", cardpayController.getAllCardPaymentsWithPayerInfo);

module.exports = router;
