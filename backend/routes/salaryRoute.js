// routes/salaryRoutes.js

const express = require('express');
const router = express.Router();
const salaryController = require('../controller/salaryController');

// Route for adding a new salary document
router.post('/add', salaryController.addSalary);

// Route for fetching salary details
router.get('/:id', salaryController.getSalary);

// Route for fetching all salary details
router.get('/', salaryController.getAllSalaries);

module.exports = router;
