const express = require('express');
const router = express.Router();
const { addLeave, getAllLeaves, approveLeave,disapproveLeave,deleteLeave,getLeaveDetails } = require('../controller/staffLeaveController');
const staffLeaveController = require('../controller/staffLeaveController');

// Route to add a new staff leave entry
router.post('/addleave', addLeave);

// Route to get all staff leave entries
router.get('/getallleaves', getAllLeaves);

// Route to approve a staff leave
router.put('/approve/:leaveId', approveLeave);

// Define route to handle disapproving a staff leave
router.put('/disapprove/:leaveId', disapproveLeave);

// Route to delete a staff leave
router.delete('/delete/:leaveId', deleteLeave);

// Route for fetching leave details by ID
router.get('/details/:leaveId', getLeaveDetails);

// Route for fetching applied leaves for a specific staff member
router.get('/applied-leaves/:staffId', staffLeaveController.getAppliedLeaves);

module.exports = router;

