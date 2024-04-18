const express = require("express");
const router = express.Router();
const feedbackinquiryController = require("../controller/feedbackinquiryController");

// Route for storing customer inquiry
router.post('/feedback', feedbackinquiryController.saveFeedback);

// Route for retrieving all feedback data
router.get('/all', feedbackinquiryController.getFeedback);


module.exports = router;