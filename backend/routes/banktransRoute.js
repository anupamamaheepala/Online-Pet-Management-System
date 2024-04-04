const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const BankTransaction = require('../models/banktransModel');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // File upload destination
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // File name configuration
  },
});

const upload = multer({ storage: storage });

// POST route to handle bank transfer with file upload
router.post('/bpay', upload.single('depositSlip'), async (req, res) => {
  try {
    const { bankName, branchName } = req.body;
    const depositSlip = req.file.path; // Uploaded file path

    const newTransaction = new BankTransaction({
      bankName,
      branchName,
      depositSlip,
    });

    const savedTransaction = await newTransaction.save();
    res.json(savedTransaction);
  } catch (error) {
    console.error('Error saving bank transaction: ', error);
    res.status(500).json({ error: 'Error saving bank transaction' });
  }
});

module.exports = router;
