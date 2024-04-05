const express = require("express");
const router = express.Router();
const feedbackController = require("../controller/feedbackController");

// Route for adding feedback
router.post("/feed", feedbackController.addFeedback);

// Route for fetching all feedback
router.get("/all", feedbackController.getAllFeedback);

// Route for deleting feedback
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
