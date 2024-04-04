const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// Route for adding feedback
router.post("/feed", feedbackController.addFeedback);

module.exports = router;
