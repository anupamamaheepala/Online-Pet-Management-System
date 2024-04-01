const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payerinfoSchema = new Schema({
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

})

const Payment = mongoose.model("payment",paymentSchema);

module.exports = paymentModel;