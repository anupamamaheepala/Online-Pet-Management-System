// advertisementRoute.js

const express = require('express');
const router = express.Router();
const Advertisement = require('../models/advertisementModel');

// Route to add a new advertisement
router.post('/add', async (req, res) => {
  try {
    const { title, description } = req.body;

    const newAdvertisement = new Advertisement({
      title,
      description
    });

    await newAdvertisement.save();

    res.status(201).json({ message: 'Advertisement added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
