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
    purpose : {
        type : String,
        require: true
    },
    amount : {
        type : Number,
        require: true
    },

}, {timestamps: false})



module.exports = mongoose.model('payerinfo', payerinfoSchema)
