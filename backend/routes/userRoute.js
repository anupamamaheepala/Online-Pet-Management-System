const express = require("express");
const router = express.Router();
//const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const authMiddleware = require("../middlewares/authMiddleware");
 
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
