// feedbackroute.js

const express = require("express");
const router = express.Router();
const feedbackController = require("../controller/feedbackController"); // Update this path

// Route to add a new feedback
router.post("/add", feedbackController.feedback);

// Route to retrieve all feedback
router.get("/", feedbackController.getfeedback);


// Route to delete an feedback by ID
//router.delete("/:_id", feedbackController.deletefeedbackById);


module.exports = router;
