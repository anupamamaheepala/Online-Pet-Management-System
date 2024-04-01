const express = require('express');
const router = express.Router();
const multer = require('multer');
const Training = require('../models/trainingModel');

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to parse form data
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// POST route for submitting training application
router.post('/api/training', upload.single('report'), async (req, res) => {
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
        data: req.file.buffer,
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
