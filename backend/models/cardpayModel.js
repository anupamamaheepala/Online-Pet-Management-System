const mongoose = require('mongoose');

//card payment
const cardpaySchema = new mongoose.Schema({

    payer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payerinfo', // Reference to the payerinfo model
        required: true
    },
    nameOnCard : {
        type : String,
        require: true
    },
    cardNumber : {
        type : String,
        require: true
    },
    cvv : {
        type : String,
        require: true
    },
    expireDate : {
        type : String,
        require: true
    },

}, {timestamps: false})

module.exports = mongoose.model('cardpay', cardpaySchema)
