const express = require("express");
const router = express.Router();
const cardpayController = require("../controller/cardpayController");

// Route for processing card payment
router.post("/cpay", cardpayController.processCardPayment);

module.exports = router;
