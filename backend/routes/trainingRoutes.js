const express = require("express");
const router = express.Router();
const Training = require("../models/trainingModel");

router.post("/insert", async (req, res) => {
  const {
    ownerName,
    address,
    contact,
    dogName,
    breed,
    age
  } = req.body;

  try {
    if (!address || !contact || !dogName || !breed || !age) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newTraining = new Training({
      ownerName,
      address,
      contact,
      dogName,
      breed,
      age
    });

    await newTraining.save();
    res.status(200).json({ message: "Data added" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ message: "Failed to add data" });
  }
});

module.exports = router;
