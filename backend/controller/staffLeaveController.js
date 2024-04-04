const StaffLeave = require('../models/staffLeaveModel');

// Controller to handle adding a new staff leave entry
exports.addLeave = async (req, res) => {
  try {
    const { sfirstname, slastname, StleaveFromDate, StleaveToDate, StleaveType, streason } = req.body;

    const newLeave = new StaffLeave({
      sfirstname,
      slastname,
      StleaveFromDate,
      StleaveToDate,
      StleaveType,
      streason
    });

    await newLeave.save();
    res.status(201).json({ message: 'Staff leave added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller to handle getting all staff leave entries
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await StaffLeave.find();
    res.status(200).json(leaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
