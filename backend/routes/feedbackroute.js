const express = require("express");
const router = express.Router();
const feedbackController = require("../controller/feedbackController");
const feedbackinquiryController = require("../controller/feedbackinquiryController");

// Routes for feedback
router.post("/feed", feedbackController.addFeedback);
router.get("/all", feedbackController.getAllFeedback);
router.delete("/:id", feedbackController.deleteFeedback);
router.put("/:id", feedbackController.updateFeedback);
router.post("/:id/like", feedbackController.likeFeedback);
router.post("/:id/dislike", feedbackController.dislikeFeedback);
router.post("/:id/reply", feedbackController.replyToFeedback);
router.get("/customer", feedbackController.getCustomerFeedback);



module.exports = router;
