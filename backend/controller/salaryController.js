// controllers/salaryController.js

const Salary = require('../models/salaryModel');

// Controller for adding a new salary document
exports.addSalary = async (req, res) => {
  try {
    const { firstName, lastName, basicSalary, otHours, otAmount, bonusAmount, totalSalary } = req.body;
    const newSalary = new Salary({
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
