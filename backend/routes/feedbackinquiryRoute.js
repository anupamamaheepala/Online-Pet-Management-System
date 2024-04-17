const express = require("express");
const router = express.Router();
const feedbackinquiryController = require("../controller/feedbackinquiryController");

// Route for storing customer inquiry
router.post('/feedback', feedbackinquiryController.saveFeedback);

module.exports = router;