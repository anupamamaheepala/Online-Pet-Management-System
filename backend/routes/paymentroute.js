const express = require("express");
const router = express.Router();
const paymentController = require("../controller/PaymentController");

// Route for adding payer information
router.post("/pay", paymentController.addPayerInfo);

//router.get("/:id", paymentController.getPayerInfoById);
// Route for fetching payer information by ID
router.get("/:id", paymentController.getCustomerById);

// Route for deleting payer information by ID
router.delete("/:id", paymentController.deletePayerInfo);


module.exports = router;