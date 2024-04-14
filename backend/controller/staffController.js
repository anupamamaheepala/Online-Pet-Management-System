const Staff = require('../models/staffModel');

// Controller function to handle adding new staff
exports.addStaff = async (req, res) => {
  try {
    const {
      staffId,
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
      staffId,
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
    if (error.code === 11000) { // Duplicate key error code
      return res.status(400).json({ error: 'Duplicate staffId or email' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller function to handle getting all staff members
exports.getAllStaff = async (req, res) => {
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
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the staff member by custom ID and delete it
    await Staff.findOneAndDelete({ staffId: id });

    res.status(200).json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get staff by custom ID
exports.getStaffById = async (req, res) => {
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

// Update staff details
exports.updateStaff = async (req, res) => {
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

    // Find the staff member by custom ID and update its details
    const updatedStaff = await Staff.findOneAndUpdate({ staffId: id }, {
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
};
