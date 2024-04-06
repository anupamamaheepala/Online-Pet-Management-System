const express = require("express");
const router = express.Router();
const feedbackController = require("../controller/feedbackController");

// Route for adding feedback
router.post("/feed", feedbackController.addFeedback);

// Route for fetching all feedback
router.get("/all", feedbackController.getAllFeedback);

// Route for deleting feedback
router.delete("/:id", feedbackController.deleteFeedback);

// Route for updating feedback
router.put("/:id", feedbackController.updateFeedback);

// Route for liking feedback
router.post("/:id/like", feedbackController.likeFeedback);

// Route for disliking feedback
router.post("/:id/dislike", feedbackController.dislikeFeedback);

// Route for replying to feedback
router.post("/:id/reply", feedbackController.replyToFeedback);

// Route for getting customer feedback (with limited fields)
router.get("/customer", feedbackController.getCustomerFeedback);

// Route to handle storing customer inquiries
router.post("/store-feedback-inquiry", feedbackController.storeFeedbackInquiry);


module.exports = router;
