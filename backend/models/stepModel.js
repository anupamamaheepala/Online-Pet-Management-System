const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
    step: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    title:{
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    filePath:{
        type:String,
        required:true
    },
    contact: {
        type: String,
        required: true
      }


},{timestamps: false})

module.exports = mongoose.model('Steps', stepSchema);
