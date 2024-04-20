// ServiceModel.js (Model)
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },

  type: { 
    type: String, 
    enum: ['Veterinary Service', 'Groome Service'], 
    required: true },

  description: { 
    type: String, 
    required: true }

},
{timestamps:false})

module.exports = mongoose.model('Services' , serviceSchema)
