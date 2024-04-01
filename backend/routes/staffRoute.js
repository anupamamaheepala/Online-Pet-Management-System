const express = require("express");
const router = express.Router();
const StaffSchema = require("../models/staffModel");

//add a single income
router.post("/add", async (req, res) => {
  //destructuring request body into its components
  console.log("inserted");
  const {
    sfirstname,
    slastname,
    snic,
    semail,
    scontactNumber,
    saddress,
    designation,
  } = req.body;

  //validations
  try {
    if (
      !sfirstname ||
      !slastname ||
      !snic ||
      !semail ||
      !scontactNumber ||
      !saddress ||
      !designation 
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const income = StaffSchema({
      sfirstname,
      slastname,
      snic,
      semail,
      scontactNumber,
      saddress,
      designation,
    });

    //saving data into the database
    await income.save();
    res.status(200).json({ message: "Staff added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;


