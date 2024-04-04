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

// Controller function to handle deleting a staff member
const deleteStaff = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the staff member by ID and delete it
      await Staff.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Staff member deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

 // Controller function to handle updating a staff member
/*const updateStaff = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        sfirstname,
        slastname,
        snic,
        semail,
        scontactNumber,
        saddress,
        designation
      } = req.body;
  
      // Find the staff member by ID and update its details
      const updatedStaff = await Staff.findByIdAndUpdate(id, {
        sfirstname,
        slastname,
        snic,
        semail,
        scontactNumber,
        saddress,
        designation
      }, { new: true });
  
      res.status(200).json(updatedStaff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };*/
  
  module.exports = {
    addStaff,
    getAllStaff,
    deleteStaff,
    //updateStaff
  };
