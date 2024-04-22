const express = require('express');
const router = express.Router();
const { addLeave, getAllLeaves, approveLeave } = require('../controller/staffLeaveController');

// Route to add a new staff leave entry
router.post('/addleave', addLeave);

// Route to get all staff leave entries
router.get('/getallleaves', getAllLeaves);

// Route to approve a staff leave
router.put('/approve/:leaveId', approveLeave);

module.exports = router;
