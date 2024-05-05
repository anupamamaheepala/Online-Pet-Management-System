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
const nodemailer = require('nodemailer');
router.put('/approve/:transactionId', async (req, res) => {
  try {
    const transaction = await BankTransaction.findById(req.params.transactionId).populate('payer');
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    transaction.status = 'approved'; // Update status to 'approved'
    await transaction.save();

    // Send email to customer
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      // Example: Gmail
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.bpassword, // Your password
      },
    });

    const mailOptions = {
    from: 'petzonemanagement@gmail.com', // Sender address
      to: transaction.payer.email,
      subject: 'Payment Confirmation',
      html: `
        <h1>Your payment was successfully received!</h1>
        <p>Thank you for choosing PetZone Animal Hospital.</p>
        <h2>Payment Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${transaction.payer.name}</li>
          <li><strong>Email:</strong> ${transaction.payer.email}</li>
          <li><strong>Purpose:</strong> ${transaction.payer.purpose}</li>
          <li><strong>Amount:</strong> ${transaction.payer.amount}</li>
        </ul>
        <p>Payment Status: ${transaction.status}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.json(transaction);
  } catch (error) {
    console.error('Error approving transaction: ', error);
    res.status(500).json({ error: 'Error approving transaction' });
  }
});


// POST route to handle disapproval of a transaction
router.put('/disapprove/:transactionId', async (req, res) => {
  try {
    const transaction = await BankTransaction.findById(req.params.transactionId).populate('payer');
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    transaction.status = 'disapproved'; // Update status to 'disapproved'
    await transaction.save();

    // Send email to customer
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      // Example: Gmail
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.dispassword, // Your password
      },
    });

    const mailOptions = {
      from: 'petzonemanagement@gmail.com',
      to: transaction.payer.email,
      subject: 'Payment Unsuccessful',
      html: `
        <h1>Your payment was unsuccessful</h1>
        <p>Please upload the correct deposit slip.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.json(transaction);
  } catch (error) {
    console.error('Error disapproving transaction: ', error);
    res.status(500).json({ error: 'Error disapproving transaction' });
  }
});

// GET route to fetch only approved bank transactions with payer details
router.get('/approved', async (req, res) => {
  try {
    const approvedTransactions = await BankTransaction.find({ status: 'approved' }).populate('payer');
    res.json(approvedTransactions);
  } catch (error) {
    console.error('Error fetching approved bank transactions: ', error);
    res.status(500).json({ error: 'Error fetching approved bank transactions' });
  }
});



