// controllers/salaryController.js
const Staff = require('../models/staffModel');
const Salary = require('../models/salaryModel');

// Controller for adding a new salary document
// In the addSalary controller function, include staffId in the request body
exports.addSalary = async (req, res) => {
  try {
      const { staffId, firstName, lastName, basicSalary, otHours, otAmount, bonusAmount, totalSalary } = req.body;
      const newSalary = new Salary({
          staffId, // Include staffId in the new Salary document
          firstName,
          lastName,
          basicSalary,
          otHours,
          otAmount,
          bonusAmount,
          totalSalary
      });
      await newSalary.save();
      res.status(201).json(newSalary);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};

// Controller for fetching salary details by staff ID
exports.getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const salary = await Salary.findOne({ staffId: id });
    if (!salary) {
      // If no salary record is found, fetch the staff details
      const staff = await Staff.findOne({ staffId: id });
      if (!staff) {
        // If no staff record is found either, return an error
        return res.status(404).json({ message: 'Staff not found' });
      }
      // Return the staff details with default values for salary-related fields
      return res.status(200).json({
        staffId: staff.staffId,
        firstName: staff.sfirstname,
        lastName: staff.slastname,
        basicSalary: 0,
        otHours: 0,
        otAmount: 0,
        bonusAmount: 0,
        totalSalary: 0
      });
    }
    // If a salary record is found, return it
    res.status(200).json(salary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
