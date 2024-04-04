/*const express = require("express");
const router = express.Router();
const staffController = require("../controller/staffController");


router.post("/addStaff",staffController); 
 try {
    // Extract form data from the request body
    const { ownerName, ownerEmail, ownerContact, petType } = req.body;

    // Create a new appointment object
    const newStaff = new StaffSchema({
      sfirstname,
      slastname,
      snic,
      semail,
      scontactNumber,
      saddress,
      designation
    });

    // Save the appointment to the database
    await newStaff.save();

    // Send a success response
    res.status(201).json({ message: 'Staff Added successfully' });
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error adding staff:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router 
module.exports = router; */

const express = require('express');
const router = express.Router();
const { addStaff, getAllStaff, deleteStaff, updateStaff } = require('../controller/staffController');

// Route to handle adding new staff
router.post('/add', addStaff);

// Route to get all staff members
router.get('/all', getAllStaff);

// Route to delete a staff member
router.delete('/:id', deleteStaff);

// Route to update a staff member
// router.put('/:id', updateStaff);

module.exports = router;


 


