const mongoose = require('mongoose');

//card payment
const cardpaySchema = new mongoose.Schema({
    nameOnCard : {
        type : String,
        require: true
    },
    cardNumber : {
        type : Number,
        require: true
    },
    cvv : {
        type : Number,
        require: true
    },
    expireDate : {
        type : String,
        require: true
    },

}, {timestamps: false})

module.exports = mongoose.model('cardpay', cardpaySchema)
