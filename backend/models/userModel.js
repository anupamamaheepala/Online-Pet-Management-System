const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     name:{
        type : String,
        required : true
     },

     email:{
        type : String,
        required : true
     },

     password:{
        type : String,
        required : true
     },

     SeenNotification :{
      type: Array,
      default: [],

     },

     UnSeenNotification :{
      type: Array,
      default: [],
   
     },
},
{
    timestamps:true
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel; 
