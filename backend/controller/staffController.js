const Staff = require('../models/staffModel');

// Controller function to handle adding new staff
const addStaff = async (req, res) => {
  try {
    const {
      sfirstname,
      slastname,
      snic,
      semail,
      scontactNumber,
      saddress,
      designation
    } = req.body;

    // Create a new staff object
    const newStaff = new Staff({
      sfirstname,
      slastname,
      snic,
      semail,
      scontactNumber,
      saddress,
      designation
    });

    // Save the new staff object to the database
    const savedStaff = await newStaff.save();

    res.status(201).json(savedStaff); // Send back the saved staff data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller function to handle getting all staff members
const getAllStaff = async (req, res) => {
  try {
    // Fetch all staff members from the database
    const allStaff = await Staff.find();
    res.status(200).json(allStaff); // Send back the staff data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addStaff,
  getAllStaff
};
