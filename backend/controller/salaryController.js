const Salary = require('../models/salaryModel');
const Staff = require('../models/staffModel');

// Controller for adding salary details
exports.addSalary = async (req, res) => {
  try {
    const { staffId, firstName, lastName, selectedMonth, basicSalary, otHours, otRate, otAmount, bonusAmount, totalSalary } = req.body;
    const newSalary = new Salary({
      staffId,
      firstName,
      lastName,
      selectedMonth,
      basicSalary,
      otHours,
      otRate,
      otAmount,
      bonusAmount,
      totalSalary
    });

    try {
      // Attempt to save the new salary document
      await newSalary.save();
      res.status(201).json(newSalary);
    } catch (error) {
      // If a duplicate key error occurs, handle it
      if (error.code === 11000 && error.keyPattern && error.keyPattern.staffId === 1) {
        // Insert the record as a new document even if it has a duplicate staffId
        const newRecord = await Salary.create({
          staffId: `${staffId}_${Date.now()}`, // Append a timestamp to make the staffId unique
          firstName,
          lastName,
          selectedMonth,
          basicSalary,
          otHours,
          otRate,
          otAmount,
          bonusAmount,
          totalSalary
        });
        res.status(201).json(newRecord);
      } else {
        // If the error is not a duplicate key error, return a generic error response
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller for fetching salary details by custom staff ID
exports.getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const salary = await Salary.findOne({ staffId: id });

    if (!salary || !salary.basicSalary) {
      // If no salary record is found or basic salary is not assigned, fetch the staff details
      const staff = await Staff.findOne({ staffId: id });

      if (!staff) {
        // If no staff record is found either, return an error
        return res.status(404).json({ message: 'Staff not found' });
      }

      // Return the staff details
      return res.status(200).json({
        staffId: staff.staffId,
        firstName: staff.sfirstname,
        lastName: staff.slastname,
        designation: staff.designation,
        message: 'Salary not assigned'
      });
    }

    // If a salary record is found and basic salary is assigned, return it
    res.status(200).json(salary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller for fetching all salary details
exports.getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.status(200).json(salaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller for updating salary details by custom staff ID
exports.updateSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      selectedMonth,
      basicSalary,
      otHours,
      otRate,
      otAmount,
      bonusAmount,
      totalSalary
    } = req.body;

    const updateFields = {
      selectedMonth,
      basicSalary,
      otHours,
      otRate,
      otAmount,
      bonusAmount,
      totalSalary
    };

    const salary = await Salary.findOneAndUpdate(
      { staffId: id },
      { $set: updateFields },
      { new: true }
    );

    if (!salary) {
      // If no salary record is found, return an error
      return res.status(404).json({ message: 'Salary not found' });
    }

    // Return the updated salary details
    res.status(200).json(salary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



// Controller for fetching salary details by staff ID or related IDs
exports.getSalaryByModifiedId = async (req, res) => {
  try {
    const { id } = req.params;
    // Use a regular expression to match staff IDs starting with the provided ID
    const salaries = await Salary.find({ staffId: new RegExp(`^${id}`) });

    if (!salaries || salaries.length === 0) {
      return res.status(404).json({ message: 'Salary details not found' });
    }

    // Return the salary details
    res.status(200).json(salaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

