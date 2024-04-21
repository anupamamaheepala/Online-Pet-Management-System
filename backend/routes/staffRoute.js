const express = require('express');
const router = express.Router();
const staffController = require('../controller/staffController');

// Route to handle adding new staff
router.post('/add', staffController.addStaff);

// Route to get all staff members
router.get('/all', staffController.getAllStaff);

// Get staff by ID
router.get('/:id', staffController.getStaffById);

// Route to delete a staff member
router.delete('/:id', staffController.deleteStaff);

// Route to update a staff member
router.put('/:id', staffController.updateStaff);

// New route for fetching staff details specifically for salary calculation
router.get('/salary/:id', staffController.getStaffByIdForSalary);

//staff login
router.post('/login', staffController.staffLogin);

// Route to get staff profile by ID
router.get('/profile/:id', staffController.getStaffProfileById);

// Add a new route in staffRoute.js
router.get('/vets-and-groomers', staffController.getVetsAndGroomers);

module.exports = router;
