const mongoose = require('mongoose');

const bankTransactionSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  depositSlip: {
    type: String, // Assuming you store the image path
    required: true,
  },
});

module.exports = mongoose.model('BankTransaction', bankTransactionSchema);
