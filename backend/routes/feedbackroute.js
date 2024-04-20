const express = require("express");
const router = express.Router();
const feedbackController = require("../controller/feedbackController");


// Routes for feedback
router.post("/feed", feedbackController.addFeedback);
router.get("/all", feedbackController.getAllFeedback);
router.delete("/:id", feedbackController.deleteFeedback);
router.put("/:id", feedbackController.updateFeedback);
router.post("/:id/like", feedbackController.likeFeedback);
router.post("/:id/dislike", feedbackController.dislikeFeedback);
router.get("/customer", feedbackController.getCustomerFeedback);
router.post("/:id/reply", feedbackController.replyToFeedback);

module.exports = router;
