// routes/salaryRoutes.js

const express = require('express');
const router = express.Router();
const salaryController = require('../controller/salaryController');

// Route for adding a new salary document
router.post('/add', salaryController.addSalary);

module.exports = router;
