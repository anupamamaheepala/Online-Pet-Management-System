const Staff = require('../models/staffModel');
const Salary = require('../models/salaryModel');

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

    //console.log('Update request received:', updates);

    // Update staff details
    const updatedStaff = await Staff.findByIdAndUpdate(id, updates, { new: true });
    //console.log('Updated staff details:', updatedStaff);

    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    // Update corresponding details in the salary collection if they exist
    await Salary.findOneAndUpdate(
      { staffId: updatedStaff.staffId },
      { firstName: updates.sfirstname, lastName: updates.slastname },
      { new: true }
    );

    res.status(200).json(updatedStaff);
  } catch (error) {
    console.error('Error updating staff:', error);
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


exports.authenticateStaff = async (req, res) => {
  try {
    const { staffId, nic } = req.body;

    // Check if a staff member with the provided staff ID and NIC exists
    const staff = await Staff.findOne({ staffId, snic: nic });

    if (!staff) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If authentication succeeds, you can generate a JWT token and send it back to the client
    // Example: const token = generateToken(staff);
    // Return the token or any other response you want
    res.status(200).json({ message: 'Authentication successful', staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
