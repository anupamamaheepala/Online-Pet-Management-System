const express = require('express');
const router = express.Router();
const Training = require('../models/trainingModel');

router.post("/add", async (req, res) => {
  try {
    const {
      ownerName,
      address,
      contact,
      dogName,
      breed,
      age,
      lastVaccinatedDate,
      vaccinationName,
      firstTime,
      trainingCenter,
      trainingType,
      bringToCenter,
      additionalPayment,
      date,
    } = req.body;

    // Parse date strings into Date objects
    const parsedLastVaccinatedDate = new Date(lastVaccinatedDate);
    const parsedDate = new Date(date);

    const newTraining = new Training({
      ownerName,
      address,
      contact,
      dogName,
      breed,
      age,
      lastVaccinatedDate: parsedLastVaccinatedDate,
      vaccinationName,
      firstTime,
      trainingCenter,
      trainingType,
      bringToCenter,
      additionalPayment,
      report: {
        data: req.file.buffer, // Assuming you're using multer for file upload
        contentType: req.file.mimetype,
      },
      date: parsedDate,
    });

    await newTraining.save();
    res.status(201).json({ message: 'Training application submitted successfully.' });
  } catch (error) {
    console.error('Error submitting training application:', error);
    res.status(500).json({ error: 'Failed to submit training application.' });
  }
});

module.exports = router;
