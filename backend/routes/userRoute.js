const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const authMiddleware = require("../middlewares/authMiddleware");

router.post('/register' , async(req , res) => {
  try {
      const userExists = await User.findOne({email: req.body.email}); 
      if(userExists)
      {
        return res.status(200).send({message: "User already exists...!", success: false});
      }
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      req.body.password = hashedpassword;
      const newuser = new User(req.body);
      await newuser.save();
      res.status(200).send({message: "User Registered Successfully...!", success: true});
  } catch (error) {
      res.status(500).send({message: "User Registered Failed...!", success: false, error})
  }
})

router.post('/login' , async(req , res) => { 

  try {
      const user = await User.findOne({email: req.body.email}); 
      if(!user)
      {
          return res.status(200).send({message: "User does not exists...!", success: false});
      }
    const isMatch = await bcrypt.compare(req.body.password, user.password); 
    if(!isMatch)
    {
      return res.status(200).send({message: "Password is incorrect...!", success: false}); 
    } else{
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1D"
      });
      res.status(200).send({message: "Login is successfull...!", success: true, data:token}); 
    }
      
  } catch (error) {
      console.log(error);
      res.status(500).send({message: "User Login Failed...!", success: false, error})
  }
}) 

/*router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
try {
  const user = await User.findOne({ _id: req.body.userId });
  user.password = undefined;
  if (!user) {
    return res.status(200).send({ message: "User does not exist...", success: false });
  } 
  else {
    res.status(200).send({
      success: true,
      data: user,
    });
  }
} catch (error) {
  res.status(500).send({ message: "Error getting user info...", success: false, error });
}
});*/



 
/*
router.post('/get-user-info-by-id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({ message: "User does not exist...", success: false });
    } 
    
    else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Error getting user info...", success: false, error });
  }
});*/



module.exports = router;
