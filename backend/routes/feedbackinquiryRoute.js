const express = require("express");
const router = express.Router();
const feedbackinquiryController = require("../controller/feedbackinquiryController");

// Route for updating feedback by ID
router.put('/:id', feedbackinquiryController.updateFeedback); // Make sure the import path is correct

// Route for storing customer inquiry
router.post('/feedback', feedbackinquiryController.saveFeedback);

// Route for retrieving all feedback data
router.get('/all', feedbackinquiryController.getFeedback);

// Route for deleting feedback by ID
router.delete('/:id', feedbackinquiryController.deleteFeedback);

// Route for updating feedback by ID
router.put('/:id', feedbackinquiryController.updateFeedback);

module.exports = router;