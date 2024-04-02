const express = require("express");
const router = express.Router();
const StaffLeaveSchema = require("../models/staffLeaveModel");

//add a single income
router.post("/addleave", async (req, res) => {
  //destructuring request body into its components
  console.log("requsted");
  const {
    sfirstname,
    slastname,
    StleaveFromDate,
    StleaveToDate,
    StleaveType,
    streason,
  } = req.body;

  //validations
  try {
    if (
      !sfirstname ||
      !slastname ||
      !StleaveFromDate ||
      !StleaveToDate ||
      !StleaveType ||
      !streason
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const leave = StaffLeaveSchema ({
      sfirstname,
      slastname,
      StleaveFromDate,
      StleaveToDate,
      StleaveType,
      streason,
    });

    //saving data into the database
    await leave.save();
    res.status(200).json({ message: "Staff Leave requested" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;


