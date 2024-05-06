const express = require("express");
const router = express.Router();
const paymentController = require("../controller/PaymentController");

// Route for adding payer information
router.post("/pay", paymentController.addPayerInfo);

// Route for fetching payer information by ID
router.get("/:id", paymentController.getCustomerById);

// Route for deleting payer information by ID
router.delete("/:id", paymentController.deletePayerInfo);

// Route for updating payer information by ID
router.put("/:id", paymentController.updatePayerInfo);


module.exports = router;