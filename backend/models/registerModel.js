const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
    

},{timestamps: false})

 /* username: String,
  email: String,
  contactNumber: String,
  address: String,
  password: String
});
*/

module.exports= mongoose.model('customer', customerSchema)

//module.exports = Register;
