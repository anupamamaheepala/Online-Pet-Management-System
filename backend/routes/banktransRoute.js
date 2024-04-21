// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const BankTransaction = require('../models/banktransModel');

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // File upload destination
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // File name configuration
//   },
// });

// const upload = multer({ storage: storage });

// // POST route to handle bank transfer with file upload
// router.post('/bpay', upload.single('depositSlip'), async (req, res) => {
//   try {
//     const { bankName, branchName } = req.body;
//     const depositSlip = req.file.path; // Uploaded file path

//     const newTransaction = new BankTransaction({
//       bankName,
//       branchName,
//       depositSlip,
//     });

//     const savedTransaction = await newTransaction.save();
//     res.json(savedTransaction);
//   } catch (error) {
//     console.error('Error saving bank transaction: ', error);
//     res.status(500).json({ error: 'Error saving bank transaction' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const BankTransaction = require('../models/banktransModel');
const payerinfo = require('../models/paymentmodel');

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
    const { payerId, bankName, branchName } = req.body;
    const depositSlip = req.file.path; // Uploaded file path

    // Check if payerId exists
    const payer = await payerinfo.findById(payerId);
    if (!payer) {
      return res.status(404).json({ error: 'Payer not found' });
    }

    const newTransaction = new BankTransaction({
      payer: payerId,
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

// GET route to fetch all bank transactions with payer details
router.get('/all', async (req, res) => {
  try {
    const bankTransactions = await BankTransaction.find().populate('payer');
    res.json(bankTransactions);
  } catch (error) {
    console.error('Error fetching bank transactions: ', error);
    res.status(500).json({ error: 'Error fetching bank transactions' });
  }
});

module.exports = router;

// POST route to handle approval of a transaction
router.put('/approve/:transactionId', async (req, res) => {
  try {
    const transaction = await BankTransaction.findById(req.params.transactionId);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    transaction.status = 'approved'; // Update status to 'approved'
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    console.error('Error approving transaction: ', error);
    res.status(500).json({ error: 'Error approving transaction' });
  }
});

// POST route to handle disapproval of a transaction
router.put('/disapprove/:transactionId', async (req, res) => {
  try {
    const transaction = await BankTransaction.findById(req.params.transactionId);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    transaction.status = 'disapproved'; // Update status to 'disapproved'
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    console.error('Error disapproving transaction: ', error);
    res.status(500).json({ error: 'Error disapproving transaction' });
  }
});




