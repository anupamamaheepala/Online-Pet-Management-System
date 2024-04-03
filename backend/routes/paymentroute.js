// const express = require("express");
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const payerinfoSchema = require("../models/paymentModel");
// const cardpaySchema = require("../models/paymentModel");

// // routes/paymentRoute.js

const express = require("express");
const router = express.Router();
const paymentController = require("../controller/PaymentController");

// Route for adding payer information
router.post("/pay", paymentController.addPayerInfo);

module.exports = router;

// module.exports = router;