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

// Route for updating salary details
router.put('/:id/update', salaryController.updateSalary);

// Route for fetching modified salary information
router.get('/modified-salary/:id', salaryController.getSalaryByModifiedId);

// Route for deleting a salary document
router.delete('/:id/delete', salaryController.deleteSalary);



module.exports = router;
