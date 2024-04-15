const Staff = require('../models/staffModel');
const mongoose = require('mongoose');

// Controller function to handle adding new staff
exports.addStaff = async (req, res) => {
  try {
    const { staffId,sfirstname, slastname, snic, semail, scontactNumber, saddress, designation } = req.body;
    const newStaff = new Staff({ staffId,sfirstname, slastname, snic, semail, scontactNumber, saddress, designation });
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Duplicate staffId or email' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};


// Controller function to handle getting all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const allStaff = await Staff.find();
    res.status(200).json(allStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller function to handle deleting a staff member
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await Staff.findByIdAndDelete(id); // Use findByIdAndDelete directly
    res.status(200).json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
// Controller function to handle getting a staff member by ID
exports.getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) { // Check if the ID is valid
      return res.status(400).json({ message: 'Invalid staff ID' });
    }
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch staff details" });
  }
};

// Update staff details
exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the parameter is named id
    const updates = req.body;
    const updatedStaff = await Staff.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.status(200).json(updatedStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller function to handle getting staff details by ID for salary
exports.getStaffByIdForSalary = async (req, res) => {
  try {
    const staff = await Staff.findOne({ staffId: req.params.id });
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch staff details" });
  }
};
