const express = require("express");
const router = express.Router();
const feedbackSchema = require("../models/feedbackmodel");

router.post("/feed", async (req, res) => {
//destructuring request body into its components
console.log("okkkk");
const {
    feedback,
    email,
    name,
    rating,
 
} = req.body;

//validations
try {
  if (
    !feedback ||
    !email || 
    !name ||
    !rating
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const income = feedbackSchema({
    feedback,
    email,
    name,
    rating,
    
    
  });

  //saving data into the database
  await income.save();
  res.status(200).json({ message: "Add added" });
} catch (error) {
  res.status(500).json({ message: "Server Error" });
}
});



module.exports = router;