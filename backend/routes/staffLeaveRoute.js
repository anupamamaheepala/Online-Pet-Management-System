const express = require('express');
const router = express.Router();
const { addLeave, getAllLeaves } = require('../controller/staffLeaveController');

// Route to add a new staff leave entry
router.post('/addleave', addLeave);

// Route to get all staff leave entries
router.get('/getallleaves', getAllLeaves);

module.exports = router;
