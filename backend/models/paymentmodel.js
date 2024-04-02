const mongoose = require('mongoose');

//payer information
const payerinfoSchema = new mongoose.Schema({
    name : {
        type : String,
        require: true
    },
    email : {
        type : String,
        require: true
    },
    phonenumber : {
        type : Number,
        require: true
    },
    address : {
        type : String,
        require: true
    },

}, {timestamps: false})

<<<<<<< HEAD
//card payment
const cardpaySchema = new mongoose.Schema({
    nameOnCard : {
        type : String,
        require: true
    },
    cardNumber : {
        type : String,
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

module.exports = mongoose.model('payerinfo', payerinfoSchema)
module.exports = mongoose.model('cardpay', cardpaySchema)
=======
module.exports = mongoose.model('Payerinfo', payerinfoSchema)
>>>>>>> 047f9e6823e859790f3bcc0a6a2dc7905828ce1b
