const express = require("express");
const router = express.Router();
const paymentController = require("../controller/PaymentController");

// Route for adding payer information
router.post("/pay", paymentController.addPayerInfo);

module.exports = router;